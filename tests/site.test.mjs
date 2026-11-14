// Тесты сайта: `node tests/site.test.mjs` (нужен Playwright с Chromium).
import { createServer } from "node:http";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const MIME = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };
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

const pages = readdirSync(ROOT).filter((f) => f.endsWith(".html"));
let failed = 0, passed = 0;
const check = (ok, name) => { ok ? passed++ : failed++; console.log(`${ok ? "  ok  " : " FAIL "} ${name}`); };

const browser = await chromium.launch();
for (const [label, viewport] of [["desktop", { width: 1280, height: 800 }], ["mobile", { width: 360, height: 740 }]]) {
  const ctx = await browser.newContext({ viewport });
  // Внешние ресурсы (шрифты) в тестах не загружаем.
  await ctx.route((u) => !u.href.startsWith(base), (r) => r.abort());
  for (const file of pages) {
    const page = await ctx.newPage();
    const errors = [], notFound = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("response", (r) => { if (r.url().startsWith(base) && r.status() >= 400) notFound.push(r.url()); });
    await page.goto(base + file, { waitUntil: "load" });
    const name = `[${label}] ${file}`;

    check(errors.length === 0, `${name}: нет ошибок JavaScript ${errors.join("; ")}`);
    check(notFound.length === 0, `${name}: все локальные ресурсы загружены ${notFound.join(", ")}`);

    const info = await page.evaluate(async () => {
      for (const i of document.images) { i.loading = "eager"; }
      await Promise.all([...document.images].map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; })));
      return {
        lang: document.documentElement.lang,
        title: document.title,
        desc: document.querySelector('meta[name="description"]')?.content || "",
        h1: document.querySelectorAll("h1").length,
        broken: [...document.images].filter((i) => !i.naturalWidth).map((i) => i.src),
        noAlt: [...document.images].filter((i) => !i.hasAttribute("alt")).length,
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
        badTel: [...document.querySelectorAll('a[href^="tel:"]')].filter((a) => !/^tel:\+375\d{9}$/.test(a.getAttribute("href"))).length,
        unsafeBlank: [...document.querySelectorAll('a[target="_blank"]')].filter((a) => !/noopener/.test(a.rel)).length,
        current: document.querySelectorAll('.nav a[aria-current="page"]').length,
      };
    });
    check(info.lang === "ru", `${name}: lang="ru"`);
    check(info.title.length > 10 && info.desc.length > 20, `${name}: есть title и description`);
    check(info.h1 === 1, `${name}: ровно один h1 (${info.h1})`);
    check(info.broken.length === 0, `${name}: нет битых картинок ${info.broken.join(", ")}`);
    check(info.noAlt === 0, `${name}: у всех картинок есть alt`);
    check(info.overflow <= 0, `${name}: нет горизонтальной прокрутки (${info.overflow}px)`);
    check(info.badTel === 0, `${name}: телефоны в формате tel:+375…`);
    check(info.unsafeBlank === 0, `${name}: внешние ссылки с rel=noopener`);
    if (file !== "credits.html") check(info.current === 1, `${name}: текущий пункт меню отмечен`);

    const local = info.links.filter((h) => !/^(https?:|mailto:|tel:|#)/.test(h));
    const missing = local.filter((h) => {
      const [f, hash] = h.split("#");
      if (!existsSync(join(ROOT, f))) return true;
      return hash && !new RegExp(`id="${hash}"`).test(readFileSync(join(ROOT, f), "utf8"));
    });
    check(missing.length === 0, `${name}: внутренние ссылки и якоря существуют ${missing.join(", ")}`);
    await page.close();
  }

  // Поведение интерфейса
  const page = await ctx.newPage();
  await page.goto(base + "index.html");
  if (label === "mobile") {
    check(!(await page.isVisible("#nav")), "[mobile] меню скрыто по умолчанию");
    await page.click("#burger");
    check(await page.isVisible("#nav a[href='contacts.html']"), "[mobile] меню открывается по кнопке");
    await page.click("#burger");
  } else {
    check(await page.isVisible("#nav a[href='contacts.html']"), "[desktop] меню видно");
  }
  check(await page.isVisible("#cookie"), `[${label}] уведомление о настройках показано`);
  await page.click("#cookie-ok");
  check(!(await page.isVisible("#cookie")), `[${label}] уведомление закрывается`);
  await page.click("#a11y-toggle");
  check(await page.evaluate(() => document.documentElement.classList.contains("a11y")), `[${label}] версия для слабовидящих включается`);
  await page.goto(base + "about.html");
  check(await page.evaluate(() => document.documentElement.classList.contains("a11y")), `[${label}] версия для слабовидящих сохраняется между страницами`);
  check(!(await page.isVisible("#cookie")), `[${label}] уведомление не показывается повторно`);
  const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check(over <= 0, `[${label}] версия для слабовидящих без горизонтальной прокрутки (${over}px)`);
  await page.click("#nav a[href='contacts.html']", { trial: label === "mobile" }).catch(() => {});
  await ctx.close();
}
await browser.close();
server.close();
console.log(`\nПройдено: ${passed}, провалено: ${failed}`);
process.exit(failed ? 1 : 0);
