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
