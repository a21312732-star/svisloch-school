// Генератор сайта: `node build.mjs` собирает *.html в корне репозитория.
// Все тексты и данные находятся в этом файле — правьте их здесь и пересобирайте.
import { writeFileSync } from "node:fs";
import { IMG } from "./images.mjs";

const OFFICIAL = "https://svisloch.pukhovichi-asveta.gov.by/";
const S = {
  name: "Свислочская средняя школа им. А. Г. Червякова",
  full: "Государственное учреждение образования «Свислочская средняя школа им. А. Г. Червякова»",
  fullBy: "Дзяржаўная ўстанова адукацыі «Свіслацкая сярэдняя школа імя А. Р. Чарвякова»",
  address: "222823, Минская область, Пуховичский район, г. п. Свислочь, ул. Строителей, 15",
  phone: "+375 1713 29198",
  phoneHref: "tel:+375171329198",
  email: "svisloch.sch@pukhovichi-asveta.gov.by",
  vk: "https://vk.com/club120194383",
  insta: "https://www.instagram.com/school_svisloch/",
  museum: "https://sites.google.com/view/svisloch-muzei-rodny-kut/",
  map: "https://yandex.by/maps/?text=" + encodeURIComponent("Минская область, Пуховичский район, Свислочь, улица Строителей, 15"),
};

const NAV = [
  ["index.html", "Главная"],
  ["about.html", "О школе"],
  ["chervyakov.html", "А. Г. Червяков"],
  ["study.html", "Учёба"],
  ["news.html", "Новости"],
  ["odno-okno.html", "Одно окно"],
  ["contacts.html", "Контакты"],
];

const ico = {
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  window: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M12 9v11"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.700l1.1-6.1L3.200 9.400l6.100-.8z"/></svg>',
  museum: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10 12 4l9 6M5 10v8M9.500 10v8M14.500 10v8M19 10v8M3 20h18"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-6.100 7-11.500A7 7 0 0 0 5 9.500C5 14.900 12 21 12 21z"/><circle cx="12" cy="9.500" r="2.500"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.500"/><path d="M2.500 20a6.500 6.500 0 0 1 13 0M16 4.800a3.500 3.500 0 0 1 0 6.400M18 14.500a6.500 6.500 0 0 1 3.500 5.500"/></svg>',
};

const NEWS = [
  { d: "13.11.2026", tag: "Инженерный класс", t: "Погружение в профессию: инженерный класс в БНТУ", p: "Учащиеся инженерного класса побывали на факультете горного дела и инженерной экологии Белорусского национального технического университета.", id: 41783 },
  { d: "10.11.2026", tag: "Олимпиады", t: "Линейка к началу II четверти: 68 дипломов олимпиады", p: "На торжественной линейке наградили победителей I этапа республиканской олимпиады: 68 дипломов на 120 участников — 23 первой, 23 второй и 22 третьей степени.", id: 41763 },
  { d: "06.11.2026", tag: "Каникулы", t: "Осенние каникулы в лагере «Лесовичок»", p: "На осенних каникулах в школе работал воспитательно-оздоровительный лагерь «Лесовичок».", id: 41733 },
  { d: "04.11.2026", tag: "Достижения", t: "Первые учебные достижения 2026/2027 учебного года", p: "Глеб Булах, Артём Кедо и Марк Гордеев получили дипломы III степени дистанционной олимпиады по информатике. Учитель — Наталья Николаевна Левошеня.", id: 41773 },
  { d: "30.10.2026", tag: "Школьная жизнь", t: "Итоги I четверти", p: "Первая четверть завершилась торжественной линейкой, на которой выступил директор школы Иван Викторович Станкевич.", id: 41653 },
  { d: "30.10.2026", tag: "Инженерный класс", t: "Погружение в мир энергетики: EnergyExpo", p: "Инженерный класс побывал на Белорусском энергетическом и экологическом форуме и принял участие в «Дне юного энергетика».", id: 41643 },
  { d: "03.11.2026", tag: "Педагогам", t: "Методический семинар об ученическом исследовании", p: "В школе прошёл методический семинар «Анатомия ученического исследования».", id: 41683 },
  { d: "20.10.2026", tag: "Безопасность", t: "Акция «Безопасность вне сезона»", p: "Школа присоединилась к профилактической акции «Безопасность вне сезона».", id: 41623 },
];
const newsUrl = (n) => `${OFFICIAL}servisy/новости-архив/document-${n.id}.html`;
const newsCard = (n, i) => `
      <article class="card">
        <img src="${IMG.news[i % IMG.news.length]}" alt="" loading="lazy" width="800" height="500">
        <div class="card-body">
          <div class="card-meta"><span class="tag">${n.tag}</span><time>${n.d}</time></div>
          <h3>${n.t}</h3>
          <p>${n.p}</p>
          <a class="more" href="${newsUrl(n)}" target="_blank" rel="noopener">Читать на официальном сайте</a>
        </div>
      </article>`;

function layout(file, title, desc, body) {
  const nav = NAV.map(([h, l]) => `<li><a href="${h}"${h === file ? ' aria-current="page"' : ""}>${l}</a></li>`).join("");
  return `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:type" content="website">
<meta property="og:image" content="${IMG.hero}">
<link rel="icon" href="assets/img/logo.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/css/styles.css">
<script>try{if(localStorage.getItem("a11y")==="1")document.documentElement.classList.add("a11y")}catch(e){}</script>
</head>
<body>
<a class="skip" href="#main">Перейти к содержанию</a>
<div class="topbar">
  <div class="wrap">
    <div class="topbar-links">
      <a href="${S.phoneHref}">${S.phone}</a>
      <a href="mailto:${S.email}">${S.email}</a>
    </div>
    <button class="a11y-btn" type="button" id="a11y-toggle" aria-pressed="false">Версия для слабовидящих</button>
  </div>
</div>
<header class="header">
  <div class="wrap">
    <a class="brand" href="index.html">
      <img class="logo-img" src="assets/img/logo.svg" alt="" width="52" height="52">
      <span class="brand-text">
        <span class="brand-name">Свислочская средняя школа</span>
        <span class="brand-sub">имени А. Г. Червякова · Пуховичский район</span>
      </span>
    </a>
    <button class="burger" type="button" id="burger" aria-label="Открыть меню" aria-expanded="false" aria-controls="nav"><span></span></button>
    <nav class="nav" id="nav" aria-label="Основное меню"><ul>${nav}</ul></nav>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="footer">
  <div class="wrap">
    <div class="footer-grid">
      <div>
        <h3>${S.name}</h3>
        <p>${S.address}</p>
        <p><a href="${S.phoneHref}">${S.phone}</a><br><a href="mailto:${S.email}">${S.email}</a></p>
      </div>
      <div>
        <h3>Разделы</h3>
        <ul>${NAV.slice(1).map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join("")}</ul>
      </div>
      <div>
        <h3>Школа в сети</h3>
        <ul>
          <li><a href="${OFFICIAL}" target="_blank" rel="noopener">Официальный сайт школы</a></li>
          <li><a href="${S.vk}" target="_blank" rel="noopener">ВКонтакте</a></li>
          <li><a href="${S.insta}" target="_blank" rel="noopener">Instagram</a></li>
          <li><a href="${S.museum}" target="_blank" rel="noopener">Сайт школьного музея</a></li>
        </ul>
      </div>
      <div>
        <h3>Государственные ресурсы</h3>
        <ul>
          <li><a href="https://president.gov.by/" target="_blank" rel="noopener">Президент Республики Беларусь</a></li>
          <li><a href="https://pravo.by/" target="_blank" rel="noopener">Национальный правовой портал</a></li>
          <li><a href="https://edu.gov.by/" target="_blank" rel="noopener">Министерство образования</a></li>
          <li><a href="https://pukhovichi-asveta.gov.by/" target="_blank" rel="noopener">Управление по образованию Пуховичского райисполкома</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 ${S.name}</span>
      <span>Сведения взяты с <a href="${OFFICIAL}" target="_blank" rel="noopener">официального сайта школы</a> и открытых источников · <a href="credits.html">Авторы фотографий</a></span>
    </div>
  </div>
</footer>
<div class="cookie" id="cookie" hidden>
  <p>Сайт сохраняет в вашем браузере только настройки отображения (версия для слабовидящих) и не собирает персональные данные.</p>
  <button class="btn btn-navy" type="button" id="cookie-ok">Понятно</button>
</div>
<script src="assets/js/main.js" defer></script>
</body>
</html>
`;
}

const head = (title, lead) => `
<section class="page-head">
  <div class="wrap">
    <div class="crumbs"><a href="index.html">Главная</a> / ${title}</div>
    <h1>${title}</h1>
    <p>${lead}</p>
  </div>
</section>`;

const pages = {};

/* ---------- Главная ---------- */
pages["index.html"] = ["Свислочская средняя школа им. А. Г. Червякова — Пуховичский район",
  "Сайт ГУО «Свислочская средняя школа им. А. Г. Червякова» Пуховичского района: новости, история, учёба, одно окно, контакты.", `
<section class="hero" style="background-image:url('${IMG.hero}')">
  <div class="wrap">
    <span class="eyebrow">Городской посёлок Свислочь · с 1935 года</span>
    <h1>Свислочская средняя школа имени А. Г. Червякова</h1>
    <p>Школа Пуховичского района, где учат думать, исследовать и создавать: инженерный класс, ресурсные центры по робототехнике и математике, школьный музей и лесничество.</p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="about.html">Узнать о школе</a>
      <a class="btn btn-ghost" href="contacts.html">Как нас найти</a>
    </div>
  </div>
</section>

<div class="wrap">
  <nav class="tiles" aria-label="Быстрые ссылки">
    <a class="tile" href="study.html#rezhim">${ico.clock}<b>Режим работы</b><span>Занятия в одну смену, начало в 8.30</span></a>
    <a class="tile" href="odno-okno.html">${ico.window}<b>Одно окно</b><span>Приём граждан и процедуры</span></a>
    <a class="tile" href="odno-okno.html#obrashcheniya">${ico.mail}<b>Обращения граждан</b><span>Как подать обращение</span></a>
    <a class="tile" href="study.html#dostizheniya">${ico.star}<b>Достижения</b><span>Олимпиады и конкурсы</span></a>
    <a class="tile" href="about.html#muzey">${ico.museum}<b>Школьный музей</b><span>«Мой родны кут»</span></a>
    <a class="tile" href="contacts.html">${ico.pin}<b>Контакты</b><span>Адрес, телефон, почта</span></a>
  </nav>
</div>

<section class="section">
  <div class="wrap split">
    <div>
      <span class="eyebrow" style="color:var(--green)">О школе</span>
      <h2>Почти век рядом с посёлком</h2>
      <p>Школа начиналась в 1935 году как филиал Дукорской школы — трёхклассная начальная школа на 18 учеников. Сегодня это современное учреждение образования в здании на 686 мест с профильными классами и ресурсными центрами района.</p>
      <p>20 апреля 1973 года школе присвоено имя Александра Григорьевича Червякова — уроженца соседней Дукоры, учителя и государственного деятеля, первого наркома просвещения Беларуси.</p>
      <a class="btn btn-navy" href="about.html">История и руководство</a>
    </div>
    <figure>
      <img src="${IMG.about}" alt="${IMG.aboutAlt}" loading="lazy" width="1200" height="800">
    </figure>
  </div>
</section>

<section class="section alt">
  <div class="wrap">
    <div class="section-head"><div><h2>Школа в цифрах</h2><p>По данным официального сайта школы; численность учащихся — за 2024/2025 учебный год.</p></div></div>
    <div class="stats">
      <div class="stat"><b>1935</b><span>год открытия школы</span></div>
      <div class="stat"><b>436</b><span>учащихся в 20 классах</span></div>
      <div class="stat"><b>45</b><span>педагогов, 30 — высшей и первой категории</span></div>
      <div class="stat"><b>686</b><span>мест в здании 1994 года</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head"><div><h2>Новости</h2><p>Последние события школьной жизни.</p></div><a class="more" href="news.html">Все новости</a></div>
    <div class="grid g3">${NEWS.slice(0, 3).map(newsCard).join("")}
    </div>
  </div>
</section>

<section class="section alt">
  <div class="wrap">
    <div class="section-head"><div><h2>Чем сильна школа</h2></div><a class="more" href="study.html">Подробнее об учёбе</a></div>
    <div class="grid g4">
      <div class="panel"><h3>Инженерный класс</h3><p>Профильный класс инженерной направленности: выезды в БНТУ, участие в форумах и «Дне юного энергетика».</p></div>
      <div class="panel"><h3>Робототехника</h3><p>Районный ресурсный центр «Образовательная робототехника» и фестиваль «Робомир».</p></div>
      <div class="panel"><h3>Математика</h3><p>Ресурсный центр по математике, призовые места на областных турнирах юных математиков.</p></div>
      <div class="panel"><h3>Школьное лесничество</h3><p>Работает с 2002 года: ребята изучают природу родного края и помогают её беречь.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap split narrow-img">
    <figure>
      <img src="${IMG.chervyakov}" alt="Александр Григорьевич Червяков, портрет" loading="lazy" width="800" height="1110">
    </figure>
    <div>
      <span class="eyebrow" style="color:var(--green)">Имя школы</span>
      <h2>Александр Григорьевич Червяков</h2>
      <p>Родился в 1892 году в деревне Дукорка — в нескольких километрах от нынешней школы. Окончил Виленский учительский институт, работал учителем, стал первым наркомом просвещения Беларуси, а в 1920–1937 годах возглавлял ЦИК БССР. 30 декабря 1922 года от имени БССР подписал Договор об образовании СССР.</p>
      <p>В школьном музее ему посвящена экспозиция «Его имя носит наша школа».</p>
      <a class="btn btn-navy" href="chervyakov.html">Биография</a>
    </div>
  </div>
</section>

<section class="section alt">
  <div class="wrap">
    <div class="panel navy">
      <div class="split" style="align-items:center">
        <div>
          <h2>Приходите к нам</h2>
          <p>${S.address}</p>
          <p>Телефон: <a href="${S.phoneHref}">${S.phone}</a><br>E-mail: <a href="mailto:${S.email}">${S.email}</a></p>
        </div>
        <div class="hero-actions" style="margin:0">
          <a class="btn btn-primary" href="contacts.html">Все контакты</a>
          <a class="btn btn-ghost" href="odno-okno.html">График приёма граждан</a>
        </div>
      </div>
    </div>
  </div>
</section>`];

/* ---------- О школе ---------- */
pages["about.html"] = ["О школе — Свислочская средняя школа им. А. Г. Червякова",
  "История, руководство, педагогический коллектив и музей Свислочской средней школы им. А. Г. Червякова.", `
${head("О школе", "История, руководство, педагогический коллектив и школьный музей «Мой родны кут».")}
<section class="section">
  <div class="wrap grid g2">
    <div class="panel">
      <h2>Официальные сведения</h2>
      <p><b>Полное наименование:</b> ${S.full}</p>
      <p><b>На белорусском языке:</b> ${S.fullBy}</p>
      <p><b>Адрес:</b> ${S.address}</p>
      <p><b>УНП:</b> 690353808</p>
      <p><b>Вышестоящая организация:</b> управление по образованию Пуховичского райисполкома (<a href="odno-okno.html#vyshe">контакты</a>).</p>
    </div>
    <figure>
      <img src="${IMG.village}" alt="${IMG.villageAlt}" loading="lazy" width="1200" height="800" style="border-radius:var(--radius);aspect-ratio:3/2;object-fit:cover;width:100%">
      <figcaption>${IMG.villageAlt}</figcaption>
    </figure>
  </div>
</section>

<section class="section alt" id="rukovodstvo">
  <div class="wrap">
    <div class="section-head"><div><h2>Руководство</h2><p>Телефон приёмной: <a href="${S.phoneHref}">${S.phone}</a></p></div><a class="more" href="odno-okno.html#priem">График приёма</a></div>
    <div class="grid g3">
      <div class="panel"><span class="tag">Директор</span><h3 style="margin-top:12px">Станкевич Иван Викторович</h3><p>Высшая квалификационная категория. Кабинет 216.</p></div>
      <div class="panel"><span class="tag">Заместитель по учебной работе</span><h3 style="margin-top:12px">Ефимочкина Татьяна Сергеевна</h3></div>
      <div class="panel"><span class="tag">Заместитель по учебной работе</span><h3 style="margin-top:12px">Семенчик Елена Геннадьевна</h3></div>
      <div class="panel"><span class="tag">Заместитель по учебной работе</span><h3 style="margin-top:12px">Мазаник Анастасия Сергеевна</h3></div>
      <div class="panel"><span class="tag">Заместитель по воспитательной работе</span><h3 style="margin-top:12px">Жукова Виктория Сергеевна</h3></div>
    </div>
  </div>
</section>

<section class="section" id="istoriya">
  <div class="wrap grid g2">
    <div>
      <h2>История школы</h2>
      <ul class="timeline">
        <li><b>1935</b>Открыт филиал Дукорской школы — начальная трёхклассная школа, 18 учеников.</li>
        <li><b>1937</b>Школа становится самостоятельной начальной.</li>
        <li><b>1944</b>После освобождения Беларуси занятия возобновлены.</li>
        <li><b>1959</b>Восьмилетняя школа, 120 учащихся.</li>
        <li><b>1966</b>Средняя школа (Дукорская средняя школа № 2), 140 учащихся.</li>
        <li><b>1970</b>Переименована в Свислочскую среднюю школу.</li>
        <li><b>20 апреля 1973</b>Школе присвоено имя А. Г. Червякова.</li>
        <li><b>3 октября 1974</b>Переезд в новое здание на 370 мест.</li>
      </ul>
    </div>
    <div>
      <h2 aria-hidden="true" style="visibility:hidden" class="hide-sm">&nbsp;</h2>
      <ul class="timeline">
        <li><b>1990</b>Профильное обучение: физико-математический, филологический и естественно-научный классы.</li>
        <li><b>1994</b>Новое здание школы на 686 мест.</li>
        <li><b>1997–2007</b>Лицейские классы при БГАТУ, БГПУ им. М. Танка и БНТУ.</li>
        <li><b>2002</b>Создано школьное лесничество.</li>
        <li><b>2013</b>Ресурсный центр по профилактике ВИЧ/СПИДа и пропаганде здорового образа жизни.</li>
        <li><b>2022–2024</b>Профильный класс педагогической направленности.</li>
        <li><b>2023–2024</b>Ресурсные центры «Образовательная робототехника» и по математике, I районный фестиваль «Робомир-2024».</li>
        <li><b>2024–2026</b>Профильный класс инженерной направленности.</li>
      </ul>
    </div>
  </div>
</section>

<section class="section alt" id="kollektiv">
  <div class="wrap">
    <div class="section-head"><div><h2>Педагогический коллектив</h2><p>Качественный состав по данным официального сайта школы.</p></div></div>
    <div class="stats">
      <div class="stat"><b>45</b><span>педагогических работников</span></div>
      <div class="stat"><b>7</b><span>учителей высшей категории</span></div>
      <div class="stat"><b>23</b><span>учителя первой категории</span></div>
      <div class="stat"><b>37</b><span>педагогов с высшим образованием</span></div>
    </div>
  </div>
</section>

<section class="section" id="muzey">
  <div class="wrap split">
    <div>
      <span class="eyebrow" style="color:var(--green)">Школьный музей</span>
      <h2>Историко-краеведческий музей «Мой родны кут»</h2>
      <p>Основатель и первый руководитель музея — учитель географии Анна Александровна Канаш. С 2009 года музеем руководит учитель географии высшей категории Елена Григорьевна Шашок.</p>
      <p><b>Экспозиции:</b></p>
      <ul>
        <li>«Край отчий, край древний» — история посёлка и имения Засвятое;</li>
        <li>«Наша школа: вчера и сегодня»;</li>
        <li>«Его имя носит наша школа» — об А. Г. Червякове, архивные документы и воспоминания;</li>
        <li>«Слава вам, бойцы суровой битвы!».</li>
      </ul>
      <p><b>Посещение:</b> в будни по предварительной записи, в субботу с 10.00 до 14.00.</p>
      <a class="btn btn-navy" href="${S.museum}" target="_blank" rel="noopener">Сайт музея</a>
    </div>
    <figure>
      <img src="${IMG.museum}" alt="${IMG.museumAlt}" loading="lazy" width="1200" height="800">
    </figure>
  </div>
</section>

<section class="section alt" id="poselok">
  <div class="wrap">
    <h2>Наш посёлок</h2>
    <div class="grid g2">
      <p>Свислочь — городской посёлок в Пуховичском районе Минской области, примерно в 38 км от Минска. Он возник в 1906 году на месте имения Засвятое. В 1930-е годы здесь начало работать торфопредприятие, поставлявшее топливо для минской ТЭЦ, позже — торфо-опытная станция и опытно-промышленный завод горного воска. Нынешнее название посёлок получил в 1974 году.</p>
      <p>Сегодня в посёлке живёт около 3,7 тысячи человек. Здесь работают экспериментальная база «Свислочь» Института природопользования НАН Беларуси, детская школа искусств, ясли-сад «Крынічка», амбулатория. Среди достопримечательностей — церковь Преподобного Серафима Саровского.</p>
    </div>
  </div>
</section>`];

/* ---------- Червяков ---------- */
pages["chervyakov.html"] = ["А. Г. Червяков — человек, чьё имя носит школа",
  "Биография Александра Григорьевича Червякова — учителя и государственного деятеля, имя которого носит Свислочская средняя школа.", `
${head("Александр Григорьевич Червяков", "Учитель, первый нарком просвещения Беларуси, «всебелорусский староста». Его имя школа носит с 20 апреля 1973 года.")}
<section class="section">
  <div class="wrap split narrow-img">
    <figure>
      <img src="${IMG.chervyakov}" alt="Александр Григорьевич Червяков, портрет" width="800" height="1110">
      <figcaption>А. Г. Червяков (1892–1937)</figcaption>
    </figure>
    <div>
      <h2>Земляк и учитель</h2>
      <p>Александр Григорьевич Червяков (бел. Аляксандр Рыгоравіч Чарвякоў) родился 25 февраля (8 марта) 1892 года в деревне Дукорка Игуменского уезда Минской губернии — сегодня это часть агрогородка Дукора Пуховичского района. Именно от Дукорской школы в 1935 году отделился филиал, из которого выросла наша школа.</p>
      <p>В 1915 году он окончил Виленский учительский институт, в 1916-м — Александровское военное училище. Работал учителем.</p>
      <h2>Государственный деятель</h2>
      <ul class="timeline">
        <li><b>1917</b>Участник Февральской революции, с мая — член партии большевиков.</li>
        <li><b>1919</b>С 1 января — нарком просвещения во Временном рабоче-крестьянском правительстве Беларуси, затем нарком просвещения Литовско-Белорусской ССР.</li>
        <li><b>1920–1937</b>Председатель Центрального исполнительного комитета БССР; в 1920–1924 годах одновременно председатель Совета народных комиссаров БССР.</li>
        <li><b>1921–1923</b>Народный комиссар иностранных дел БССР.</li>
        <li><b>30 декабря 1922</b>От имени БССР подписал Договор и Декларацию об образовании СССР; стал одним из сопредседателей ЦИК СССР.</li>
        <li><b>16 июня 1937</b>Ушёл из жизни в Минске во время XVI съезда КП(б)Б. Похоронен на Военном кладбище в Минске.</li>
      </ul>
      <p>Червяков способствовал открытию Белорусского государственного университета. В народе его называли «всебелорусским старостой».</p>
      <h2>Память</h2>
      <p>Именем Червякова названы улица и переулок в Минске, улица в Дукорке; в Минске на улице Карла Маркса, 30 установлена мемориальная доска. В школьном музее «Мой родны кут» работает экспозиция «Его имя носит наша школа»: материалы для неё помогли собрать Софья Александровна Червякова и Валентина Николаевна Белякова (Голодед).</p>
      <p class="note">Источники: страница истории на <a href="${OFFICIAL}" target="_blank" rel="noopener">официальном сайте школы</a> и статья <a href="https://ru.wikipedia.org/wiki/Червяков,_Александр_Григорьевич" target="_blank" rel="noopener">«Червяков, Александр Григорьевич»</a> в Википедии.</p>
    </div>
  </div>
</section>`];

/* ---------- Учёба ---------- */
pages["study.html"] = ["Учёба — Свислочская средняя школа им. А. Г. Червякова",
  "Режим работы, профильные классы, ресурсные центры и достижения учащихся Свислочской средней школы.", `
${head("Учёба", "Режим работы школы, профильные классы, ресурсные центры и достижения наших учеников.")}
<section class="section" id="rezhim">
  <div class="wrap grid g2">
    <div>
      <h2>Режим работы</h2>
      <div class="table-wrap">
        <table>
          <tr><th>Что</th><th>Когда</th></tr>
          <tr><td>Школа, понедельник–пятница</td><td>7.30–21.00</td></tr>
          <tr><td>Школа, суббота</td><td>8.00–15.00</td></tr>
          <tr><td>Воскресенье</td><td>выходной</td></tr>
          <tr><td>Учебные занятия</td><td>в одну смену, начало в 8.30</td></tr>
          <tr><td>Группа продлённого дня, I классы</td><td>12.15–18.15</td></tr>
          <tr><td>Группа продлённого дня, II классы</td><td>13.15–19.15</td></tr>
          <tr><td>Библиотека</td><td>9.00–17.00</td></tr>
          <tr><td>Спортивные секции</td><td>16.00–20.00</td></tr>
        </table>
      </div>
      <p class="note" style="margin-top:18px">Расписание звонков и занятий, а также расписание кружков и секций публикуются на <a href="${OFFICIAL}" target="_blank" rel="noopener">официальном сайте школы</a> в разделе «Учебный процесс».</p>
    </div>
    <figure>
      <img src="${IMG.study}" alt="${IMG.studyAlt}" loading="lazy" width="1200" height="800" style="border-radius:var(--radius);width:100%;aspect-ratio:3/2;object-fit:cover">
    </figure>
  </div>
</section>

<section class="section alt" id="profil">
  <div class="wrap">
    <div class="section-head"><div><h2>Профили и ресурсные центры</h2></div></div>
    <div class="grid g3">
      <div class="panel"><h3>Инженерный класс</h3><p>Профильный класс инженерной направленности (2024–2026). Ученики знакомятся с профессией в БНТУ и на отраслевых форумах.</p></div>
      <div class="panel"><h3>«Образовательная робототехника»</h3><p>Ресурсный центр открыт в 2023 году. В 2024-м школа провела I районный фестиваль «Робомир-2024».</p></div>
      <div class="panel"><h3>Ресурсный центр по математике</h3><p>Работает с 2024 года и объединяет увлечённых математикой школьников района.</p></div>
      <div class="panel"><h3>НОУ «Эрудит»</h3><p>Научное общество учащихся: исследовательские работы и интеллектуальные турниры.</p></div>
      <div class="panel"><h3>Школьное лесничество</h3><p>С 2002 года учащиеся изучают лес и участвуют в природоохранной работе.</p></div>
      <div class="panel"><h3>Жизнь после уроков</h3><p>Театральное объединение «Театральная мозаика», пионерская дружина, БРСМ, волонтёрское движение, туристические слёты.</p></div>
    </div>
  </div>
</section>

<section class="section" id="dostizheniya">
  <div class="wrap">
    <div class="section-head"><div><h2>Достижения учащихся</h2><p>Выборка с официального сайта школы; полные списки — там же.</p></div></div>
    <details open>
      <summary>2025/2026 учебный год</summary>
      <div class="inner"><ul>
        <li>Второй этап республиканской олимпиады, география: Михаил Чикида — диплом I степени, Даниил Лупачик — II степени.</li>
        <li>Русский язык: Татьяна Писарчик — диплом II степени; английский язык: Иван Милованов — II степени.</li>
        <li>Областная дистанционная олимпиада «На пути к успеху», информатика: Константин Гетманов и Иван Милованов — дипломы I степени.</li>
        <li>Международный конкурс «Золотая рыбка»: Семён Мищук и Дмитрий Попов — I степень.</li>
      </ul></div>
    </details>
    <details>
      <summary>2024/2025 учебный год</summary>
      <div class="inner"><ul>
        <li>Республиканский конкурс чтецов к 80-летию освобождения Беларуси: Полина Громыко — диплом I степени.</li>
        <li>Областная олимпиада «Вершины Минщины»: Алеся Галицкая и Тимофей Казакевич — дипломы I степени.</li>
        <li>59-й туристический слёт: сборная 6–11 классов — диплом I степени.</li>
        <li>Турнир «Думка беларуская – 2024»: команда НОУ «Эрудит» — 10-е место из 29.</li>
        <li>Конкурс «РобИн-2025»: Артём Травничек — диплом II степени.</li>
      </ul></div>
    </details>
    <details>
      <summary>2023/2024 учебный год</summary>
      <div class="inner"><ul>
        <li>XII областной мини-турнир юных математиков: команда школы — II место.</li>
        <li>Областной конкурс робототехники «Дорога в будущее-2024» — III место.</li>
      </ul></div>
    </details>
  </div>
</section>`];

/* ---------- Новости ---------- */
pages["news.html"] = ["Новости — Свислочская средняя школа им. А. Г. Червякова",
  "Новости Свислочской средней школы им. А. Г. Червякова.", `
${head("Новости", "События школьной жизни. Полные тексты и фотографии — на официальном сайте школы.")}
<section class="section">
  <div class="wrap">
    <div class="grid g3">${NEWS.map(newsCard).join("")}
    </div>
    <p style="margin-top:30px"><a class="btn btn-navy" href="${OFFICIAL}" target="_blank" rel="noopener">Архив новостей на официальном сайте</a></p>
  </div>
</section>`];

/* ---------- Одно окно ---------- */
pages["odno-okno.html"] = ["Одно окно и обращения граждан — Свислочская средняя школа",
  "График личного приёма, обращения граждан, вышестоящая организация и полезные ссылки.", `
${head("Одно окно", "Личный приём, обращения граждан и юридических лиц, вышестоящая организация.")}
<section class="section" id="priem">
  <div class="wrap">
    <div class="section-head"><div><h2>График личного приёма граждан</h2><p>Предварительная запись по телефону <a href="${S.phoneHref}">${S.phone}</a>.</p></div></div>
    <div class="table-wrap">
      <table>
        <tr><th>День</th><th>Время</th><th>Кто принимает</th><th>Кабинет</th></tr>
        <tr><td>Понедельник</td><td>8.00–13.00, 14.00–20.00<br><small>по предварительной записи</small></td><td>Станкевич И. В., директор</td><td>216</td></tr>
        <tr><td>Вторник</td><td>8.00–13.30, 14.30–16.30</td><td>Ефимочкина Т. С., заместитель директора</td><td>305</td></tr>
        <tr><td>Среда</td><td>8.00–13.15, 14.15–16.30</td><td>Семенчик Е. Г., заместитель директора</td><td>305</td></tr>
        <tr><td>Четверг</td><td>8.00–12.00, 13.00–16.30</td><td>Жукова В. С., заместитель директора</td><td>305</td></tr>
        <tr><td>Пятница</td><td>8.00–13.00, 14.00–17.00</td><td>Станкевич И. В., директор</td><td>216</td></tr>
        <tr><td>Суббота</td><td>9.00–14.00</td><td>Дежурный администратор</td><td>305</td></tr>
      </table>
    </div>
  </div>
</section>

<section class="section alt" id="obrashcheniya">
  <div class="wrap grid g2">
    <div class="panel">
      <h2>Обращения граждан</h2>
      <p>Обращение можно подать:</p>
      <ul>
        <li><b>письменно</b> — по адресу: ${S.address};</li>
        <li><b>устно</b> — на личном приёме согласно графику;</li>
        <li><b>в электронном виде</b> — через государственную систему учёта и обработки обращений <a href="https://обращения.бел/" target="_blank" rel="noopener">обращения.бел</a>.</li>
      </ul>
      <p>Порядок рассмотрения обращений установлен Законом Республики Беларусь «Об обращениях граждан и юридических лиц».</p>
      <p><b>«Горячая линия» школы:</b> <a href="${S.phoneHref}">${S.phone}</a></p>
    </div>
    <div class="panel">
      <h2>Административные процедуры</h2>
      <p>Перечень административных процедур, выполняемых школой по заявлениям граждан, образцы заявлений, сроки и ответственные лица размещены в разделе «Одно окно» официального сайта.</p>
      <p><a class="btn btn-navy" href="${OFFICIAL}одно-окно" target="_blank" rel="noopener">Раздел «Одно окно» на официальном сайте</a></p>
      <p>Оценить качество работы организации можно на портале <a href="https://качество-услуг.бел/" target="_blank" rel="noopener">качество-услуг.бел</a>.</p>
    </div>
  </div>
</section>

<section class="section" id="vyshe">
  <div class="wrap">
    <h2>Вышестоящая организация</h2>
    <div class="panel">
      <h3>Управление по образованию Пуховичского районного исполнительного комитета</h3>
      <p>222811, Минская область, Пуховичский район, г. Марьина Горка, ул. Ленинская, 47</p>
      <p>Приёмная: <a href="tel:+375171345786">+375 1713 45786</a><br>
      E-mail: <a href="mailto:upravlenie@pukhovichi-asveta.gov.by">upravlenie@pukhovichi-asveta.gov.by</a><br>
      Сайт: <a href="https://pukhovichi-asveta.gov.by/" target="_blank" rel="noopener">pukhovichi-asveta.gov.by</a></p>
    </div>
  </div>
</section>`];

/* ---------- Контакты ---------- */
pages["contacts.html"] = ["Контакты — Свислочская средняя школа им. А. Г. Червякова",
  "Адрес, телефон, электронная почта и режим работы Свислочской средней школы им. А. Г. Червякова.", `
${head("Контакты", "Адрес, телефон, электронная почта и режим работы школы.")}
<section class="section">
  <div class="wrap grid g2">
    <div class="panel">
      <h2>Как с нами связаться</h2>
      <ul class="contact-list">
        <li>${ico.pin}<div><small>Адрес</small>${S.address}</div></li>
        <li>${ico.phone}<div><small>Телефон (приёмная, «горячая линия»)</small><a href="${S.phoneHref}">${S.phone}</a></div></li>
        <li>${ico.mail}<div><small>Электронная почта</small><a href="mailto:${S.email}">${S.email}</a></div></li>
        <li>${ico.clock}<div><small>Режим работы</small>Понедельник–пятница: 7.30–21.00<br>Суббота: 8.00–15.00<br>Воскресенье: выходной</div></li>
        <li>${ico.users}<div><small>Директор</small>Станкевич Иван Викторович</div></li>
      </ul>
      <div class="hero-actions">
        <a class="btn btn-navy" href="${S.map}" target="_blank" rel="noopener">Открыть на карте</a>
      </div>
    </div>
    <div class="grid" style="align-content:start">
      <div class="panel">
        <h2>Школа в сети</h2>
        <ul>
          <li><a href="${OFFICIAL}" target="_blank" rel="noopener">Официальный сайт школы</a></li>
          <li><a href="${S.vk}" target="_blank" rel="noopener">Группа ВКонтакте</a></li>
          <li><a href="${S.insta}" target="_blank" rel="noopener">Instagram @school_svisloch</a></li>
          <li><a href="${S.museum}" target="_blank" rel="noopener">Сайт музея «Мой родны кут»</a></li>
        </ul>
      </div>
      <div class="panel">
        <h2>Как добраться</h2>
        <p>Городской посёлок Свислочь находится в Пуховичском районе, примерно в 38 км от Минска. Школа расположена на улице Строителей, 15.</p>
      </div>
    </div>
  </div>
</section>`];

/* ---------- Авторы фото ---------- */
pages["credits.html"] = ["Авторы фотографий — Свислочская средняя школа",
  "Источники и лицензии фотографий, использованных на сайте.", `
${head("Авторы фотографий", "На сайте использованы изображения со свободными лицензиями.")}
<section class="section">
  <div class="wrap">
    <div class="table-wrap">
      <table>
        <tr><th>Изображение</th><th>Автор</th><th>Лицензия</th><th>Источник</th></tr>
        ${IMG.credits.map((c) => `<tr><td>${c.what}</td><td>${c.author}</td><td>${c.license}</td><td><a href="${c.url}" target="_blank" rel="noopener">ссылка</a></td></tr>`).join("\n        ")}
      </table>
    </div>
  </div>
</section>`];

for (const [file, [title, desc, body]] of Object.entries(pages)) {
  writeFileSync(new URL(file, import.meta.url), layout(file, title, desc, body));
}
console.log("Собрано страниц:", Object.keys(pages).length);
