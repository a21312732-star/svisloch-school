(function () {
  // Мобильное меню
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  function setMenu(open) {
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  }
  burger.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
  nav.addEventListener("click", function (e) { if (e.target.tagName === "A") setMenu(false); });

  // Слайдер работ
  var slides = Array.prototype.slice.call(document.querySelectorAll("#slider .slide"));
  var dots = document.getElementById("dots");
  var current = 0;
  slides.forEach(function (_, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.setAttribute("aria-label", "Работа " + (i + 1) + " из " + slides.length);
    b.addEventListener("click", function () { show(i); });
    dots.appendChild(b);
  });
  function show(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach(function (s, k) { s.classList.toggle("active", k === current); });
    Array.prototype.forEach.call(dots.children, function (d, k) {
      d.setAttribute("aria-current", k === current ? "true" : "false");
    });
  }
  document.getElementById("prev").addEventListener("click", function () { show(current - 1); });
  document.getElementById("next").addEventListener("click", function () { show(current + 1); });
  document.getElementById("slider").addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
  show(0);

  // Форма-заглушка: данные никуда не отправляются
  var form = document.getElementById("form");
  var ok = document.getElementById("form-ok");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim();
    var digits = form.elements.phone.value.replace(/\D/g, "");
    ok.hidden = false;
    if (!name || digits.length < 9) {
      ok.textContent = "Укажите имя и номер телефона — не меньше 9 цифр.";
      return;
    }
    ok.textContent = "Спасибо, " + name + "! Это демо-версия: заявка не отправлена.";
    form.reset();
  });
})();
