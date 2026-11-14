(function () {
  var root = document.documentElement;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  // Версия для слабовидящих
  var a11y = document.getElementById("a11y-toggle");
  function syncA11y() {
    var on = root.classList.contains("a11y");
    a11y.setAttribute("aria-pressed", on ? "true" : "false");
    a11y.textContent = on ? "Обычная версия" : "Версия для слабовидящих";
  }
  a11y.addEventListener("click", function () {
    root.classList.toggle("a11y");
    store.set("a11y", root.classList.contains("a11y") ? "1" : "0");
    syncA11y();
  });
  syncA11y();

  // Мобильное меню
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  burger.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  });

  // Уведомление о хранении настроек
  var cookie = document.getElementById("cookie");
  if (store.get("cookie-ok") !== "1") cookie.hidden = false;
  document.getElementById("cookie-ok").addEventListener("click", function () {
    store.set("cookie-ok", "1");
    cookie.hidden = true;
  });
})();
