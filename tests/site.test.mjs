// Тесты сайта: `node tests/site.test.mjs` (нужен Playwright с Chromium).
import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MIME = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".md": "text/plain; charset=utf-8" };
const server = createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  const f = join(ROOT, p);
  if (!f.startsWith(ROOT) || !existsSync(f)) { res.writeHead(404); return res.end("404"); }
  res.writeHead(200, { "content-type": MIME[extname(f)] || "application/octet-stream" });
  res.end(readFileSync(f));
});
await new Promise((r) => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}/`;

let failed = 0, passed = 0;
const check = (ok, name) => { ok ? passed++ : failed++; console.log(`${ok ? "  ok  " : " FAIL "} ${name}`); };
const overflow = (page) => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);

const browser = await chromium.launch();
for (const [label, viewport] of [["desktop", { width: 1280, height: 800 }], ["tablet", { width: 800, height: 1000 }], ["mobile", { width: 360, height: 740 }]]) {
  const ctx = await browser.newContext({ viewport });
  await ctx.route((u) => !u.href.startsWith(base), (r) => r.abort());
  const page = await ctx.newPage();
  const errors = [], notFound = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("response", (r) => { if (r.url().startsWith(base) && r.status() >= 400) notFound.push(r.url()); });
  await page.goto(base, { waitUntil: "load" });
  const t = (s) => `[${label}] ${s}`;

  const info = await page.evaluate(async () => {
    for (const i of document.images) i.loading = "eager";
    await Promise.all([...document.images].map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; })));
    return {
      lang: document.documentElement.lang,
      title: document.title, desc: document.querySelector('meta[name="description"]')?.content || "",
      h1: document.querySelectorAll("h1").length,
      broken: [...document.images].filter((i) => !i.naturalWidth).map((i) => i.src),
      noAlt: [...document.images].filter((i) => !i.hasAttribute("alt")).length,
      badAnchors: [...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute("href")).filter((h) => !document.getElementById(h.slice(1))),
      unsafeBlank: [...document.querySelectorAll('a[target="_blank"]')].filter((a) => !/noopener/.test(a.rel)).length,
      unlabeled: [...document.querySelectorAll("button, a")].filter((e) => !(e.textContent.trim() || e.getAttribute("aria-label"))).length,
    };
  });
  check(errors.length === 0, t(`нет ошибок JavaScript ${errors.join("; ")}`));
  check(notFound.length === 0, t(`все локальные ресурсы загружены ${notFound.join(", ")}`));
  check(info.lang === "ru", t('lang="ru"'));
  check(info.title.length > 10 && info.desc.length > 20, t("есть title и description"));
  check(info.h1 === 1, t(`ровно один h1 (${info.h1})`));
  check(info.broken.length === 0, t(`нет битых картинок ${info.broken.join(", ")}`));
  check(info.noAlt === 0, t("у всех картинок есть alt"));
  check(info.badAnchors.length === 0, t(`все якорные ссылки ведут на существующие блоки ${info.badAnchors.join(", ")}`));
  check(info.unsafeBlank === 0, t("внешние ссылки с rel=noopener"));
  check(info.unlabeled === 0, t("у всех кнопок и ссылок есть подпись"));
  check((await overflow(page)) <= 0, t("нет горизонтальной прокрутки"));
  check(existsSync(join(ROOT, "CREDITS.md")), t("файл с источниками фото на месте"));

  // Меню
  if (label === "desktop") {
    check(await page.isVisible("#nav a[href='#contacts']"), t("меню видно"));
  } else {
    check(!(await page.isVisible("#nav")), t("меню скрыто по умолчанию"));
    await page.click("#burger");
    check(await page.isVisible("#nav a[href='#contacts']"), t("меню открывается по кнопке"));
    await page.click("#nav a[href='#services']");
    check(!(await page.isVisible("#nav")), t("меню закрывается после выбора пункта"));
  }

  // Слайдер
  const active = () => page.evaluate(() => [...document.querySelectorAll(".slide")].findIndex((s) => s.classList.contains("active")));
  const visible = () => page.evaluate(() => [...document.querySelectorAll(".slide")].filter((s) => s.offsetParent).length);
  check((await active()) === 0 && (await visible()) === 1, t("слайдер: показан первый слайд"));
  await page.click("#next");
  check((await active()) === 1 && (await visible()) === 1, t("слайдер: стрелка «вперёд»"));
  await page.click("#prev"); await page.click("#prev");
  check((await active()) === 2, t("слайдер: «назад» с первого слайда ведёт на последний"));
  await page.click("#dots button:nth-child(2)");
  check((await active()) === 1, t("слайдер: переключение точками"));
  check((await page.getAttribute("#dots button:nth-child(2)", "aria-current")) === "true", t("слайдер: активная точка отмечена"));
  check((await overflow(page)) <= 0, t("слайдер: нет горизонтальной прокрутки на любом слайде"));

  // Форма
  await page.click("#form button[type=submit]");
  check(/Укажите/.test(await page.textContent("#form-ok")), t("форма: пустая заявка не принимается"));
  await page.fill("#form [name=name]", "Тест");
  await page.fill("#form [name=phone]", "+375 29 123-45-67");
  await page.click("#form button[type=submit]");
  check(/Спасибо, Тест/.test(await page.textContent("#form-ok")), t("форма: корректная заявка даёт подтверждение"));
  check((await page.inputValue("#form [name=name]")) === "", t("форма: поля очищаются"));
  await ctx.close();
}
await browser.close();
server.close();
console.log(`\nПройдено: ${passed}, провалено: ${failed}`);
process.exit(failed ? 1 : 0);
