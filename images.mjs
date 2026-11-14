// Изображения сайта: какие фотографии где показываются.
// Все фото — со свободными лицензиями (Wikimedia Commons), авторы перечислены в credits.
const I = "assets/img/";
export const IMG = {
  hero: I + "hero-school.jpg",
  about: I + "school-old-building.jpg", aboutAlt: "Кирпичное здание школы в Свислочи с клумбами перед входом",
  village: I + "svisloch-river.jpg", villageAlt: "Река Свислочь у посёлка Свислочь",
  museum: I + "books.jpg", museumAlt: "Стопка старинных книг",
  study: I + "chalkboard.jpg", studyAlt: "Ребёнок рисует мелом на школьной доске",
  chervyakov: I + "chervyakov.jpg",
  news: ["school-panorama.jpg", "books-desk.jpg", "school-grounds.jpg", "pencils.jpg", "school-entrance.jpg", "school-stadium.jpg", "chalkboard.jpg", "svisloch-street-autumn.jpg"].map((f) => I + f),
  credits: [
  {
    "what": "Свислочская средняя школа им. А. Г. Червякова — трёхэтажное панельное здание («новое здание» по описанию на Commons), вид с угла, 2018",
    "author": "Павел (Паўлюк) Шапецька",
    "license": "CC BY-SA 4.0",
    "url": "https://commons.wikimedia.org/wiki/File:%D0%A1%D0%B2%D1%96%D1%81%D0%BB%D0%B0%D1%87._%D0%A1%D0%B2%D1%96%D1%81%D0%BB%D0%B0%D1%86%D0%BA%D0%B0%D1%8F_%D1%81%D1%8F%D1%80%D1%8D%D0%B4%D0%BD%D1%8F%D1%8F_%D1%88%D0%BA%D0%BE%D0%BB%D0%B0_%D1%96%D0%BC%D1%8F_%D0%90.%D0%A0._%D0%A7%D0%B0%D1%80%D0%B2%D1%8F%D0%BA%D0%BE%D0%B2%D0%B0.jpg"
  },
  {
    "what": "Свислочская школа им. А. Г. Червякова — широкая панорама фасада с главным входом, 2018",
    "author": "Павел (Паўлюк) Шапецька",
    "license": "CC BY-SA 4.0",
    "url": "https://commons.wikimedia.org/wiki/File:%D0%A1%D0%B2%D1%96%D1%81%D0%BB%D0%B0%D1%87_(%D0%9F%D1%83%D1%85%D0%B0%D0%B2%D1%96%D1%86%D0%BA%D1%96_%D1%80%D0%B0%D1%91%D0%BD),_%D1%88%D0%BA%D0%BE%D0%BB%D0%B0_2.jpg"
  },
  {
    "what": "«Старая школа» в Свислочи (подпись автора на Commons; ул. Набережная) — трёхэтажное кирпичное здание с клумбами перед входом, 2018",
    "author": "Павел (Паўлюк) Шапецька",
    "license": "CC BY-SA 4.0",
    "url": "https://commons.wikimedia.org/wiki/File:%D0%A1%D0%B2%D1%96%D1%81%D0%BB%D0%B0%D1%87_(%D0%9F%D1%83%D1%85%D0%B0%D0%B2%D1%96%D1%86%D0%BA%D1%96_%D1%80%D0%B0%D1%91%D0%BD),_%D1%88%D0%BA%D0%BE%D0%BB%D0%B0_1.jpg"
  },
  {
    "what": "Вход на территорию школы — кованые ворота и аллея под деревьями, 2018",
    "author": "Павел (Паўлюк) Шапецька",
    "license": "CC BY-SA 4.0",
    "url": "https://commons.wikimedia.org/wiki/File:%D0%A1%D0%B2%D1%96%D1%81%D0%BB%D0%B0%D1%87._%D0%A1%D0%B2%D1%96%D1%81%D0%BB%D0%B0%D1%86%D0%BA%D0%B0%D1%8F_%D1%81%D1%8F%D1%80%D1%8D%D0%B4%D0%BD%D1%8F%D1%8F_%D1%88%D0%BA%D0%BE%D0%BB%D0%B0_%D1%96%D0%BC%D1%8F_%D0%90.%D0%A0._%D0%A7%D0%B0%D1%80%D0%B2%D1%8F%D0%BA%D0%BE%D0%B2%D0%B0_1.jpg"
  },
  {
    "what": "Территория школы — деревья, скамейки, детская площадка, корпус школы на заднем плане, 2018",
    "author": "Павел (Паўлюк) Шапецька",
    "license": "CC BY-SA 4.0",
    "url": "https://commons.wikimedia.org/wiki/File:%D0%A1%D0%B2%D1%96%D1%81%D0%BB%D0%B0%D1%87._%D0%A1%D0%B2%D1%96%D1%81%D0%BB%D0%B0%D1%86%D0%BA%D0%B0%D1%8F_%D1%81%D1%8F%D1%80%D1%8D%D0%B4%D0%BD%D1%8F%D1%8F_%D1%88%D0%BA%D0%BE%D0%BB%D0%B0_%D1%96%D0%BC%D1%8F_%D0%90.%D0%A0._%D0%A7%D0%B0%D1%80%D0%B2%D1%8F%D0%BA%D0%BE%D0%B2%D0%B0_2.jpg"
  },
  {
    "what": "Школьный стадион — футбольное поле, волейбольная площадка, сосновый лес и корпус школы, 2018",
    "author": "Павел (Паўлюк) Шапецька",
    "license": "CC BY-SA 4.0",
    "url": "https://commons.wikimedia.org/wiki/File:%D0%A1%D0%B2%D1%96%D1%81%D0%BB%D0%B0%D1%87,_%D1%88%D0%BA%D0%BE%D0%BB%D1%8C%D0%BD%D1%8B_%D1%81%D1%82%D0%B0%D0%B4%D1%8B%D1%91%D0%BD.jpg"
  },
  {
    "what": "Река Свислочь у посёлка Свислочь, мост через реку",
    "author": "Павел (Паўлюк) Шапецька",
    "license": "CC BY-SA 4.0",
    "url": "https://commons.wikimedia.org/wiki/File:%D0%A1%D0%B2%D1%96%D1%81%D0%BB%D0%B0%D1%87._%D0%9C%D0%BE%D1%81%D1%82_%D0%BF%D1%80%D0%B0%D0%B7_%D1%80%D0%B0%D0%BA%D1%83_%D0%A1%D0%B2%D1%96%D1%81%D0%BB%D0%B0%D1%87_1.jpg"
  },
  {
    "what": "Посёлок Свислочь — улица с осенним клёном, солнечный день",
    "author": "Denis Blisch",
    "license": "CC BY-SA 4.0",
    "url": "https://commons.wikimedia.org/wiki/File:%D0%A1%D0%B2%D0%B8%D1%81%D0%BB%D0%BE%D1%87%D1%8C,_%D0%9F%D1%83%D1%85%D0%BE%D0%B2%D0%B8%D1%87%D1%81%D0%BA%D0%B8%D0%B9_%D1%80%D0%B0%D0%B9%D0%BE%D0%BD,_%D0%9C%D0%B8%D0%BD%D1%81%D0%BA%D0%B0%D1%8F_%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C,_%D0%91%D0%B5%D0%BB%D0%B0%D1%80%D1%83%D1%81%D1%8C_27.jpg"
  },
  {
    "what": "Александр Григорьевич Червяков — фотопортрет, 1920-е (ч/б)",
    "author": "неизвестный автор",
    "license": "Public domain (общественное достояние)",
    "url": "https://commons.wikimedia.org/wiki/File:Aliaksandr_%C4%8Carviako%C5%AD,_partret._%D0%90%D0%BB%D1%8F%D0%BA%D1%81%D0%B0%D0%BD%D0%B4%D1%80_%D0%A7%D0%B0%D1%80%D0%B2%D1%8F%D0%BA%D0%BE%D1%9E,_%D0%BF%D0%B0%D1%80%D1%82%D1%80%D1%8D%D1%82.jpg"
  },
  {
    "what": "Рука ребёнка рисует мелом на школьной доске",
    "author": "Shixart1985",
    "license": "CC BY 2.0",
    "url": "https://commons.wikimedia.org/wiki/File:Child_draws_on_chalkboard_with_chalk_during_art_activity_in_classroom_setting.jpg"
  },
  {
    "what": "Стопка из четырёх старинных книг на белом фоне",
    "author": "Ch. Maderthoner",
    "license": "CC0",
    "url": "https://commons.wikimedia.org/wiki/File:Old_Books_01.JPG"
  },
  {
    "what": "Стопка книг на столе у окна с настольными лампами",
    "author": "chuttersnap (Unsplash)",
    "license": "CC0",
    "url": "https://commons.wikimedia.org/wiki/File:Books_in_stack_with_lamps_(Unsplash).jpg"
  },
  {
    "what": "Цветные карандаши крупным планом на тёмном фоне",
    "author": "Dietmar Rabich",
    "license": "CC BY-SA 4.0",
    "url": "https://commons.wikimedia.org/wiki/File:Buntstifte_--_2021_--_9148.jpg"
  }
],
};
