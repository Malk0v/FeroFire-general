/* FEROFIRE — shared/nav.js
   Меню категорій для всіх магазинів сайту.
   Телефон: кнопка-«бургер» відкриває висувне меню. Комп'ютер: колонка зліва.
   Список береться з shared/categories.json: додали рядок, і новий магазин
   з'явився в меню на всіх сторінках. Рядок з "soon": true показується як «скоро». */
(function () {
  var script = document.currentScript;
  var sharedUrl = new URL("./", script.src);   // .../shared/
  var siteUrl = new URL("../", sharedUrl);     // корінь сайту
  var DESKTOP = window.matchMedia("(min-width: 1100px)");

  fetch(new URL("categories.json", sharedUrl)).then(function (r) { return r.json(); }).then(build).catch(function (e) {
    console.warn("FEROFIRE nav: не вдалося завантажити categories.json", e);
  });

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function listHtml(data) {
    var here = location.pathname.replace(/index\.html$/, "");
    var items = ['<li><a class="ff-link ff-home" href="' + esc(siteUrl.href) + '">← ' + esc(data.home.title) + '</a></li>'];
    data.categories.forEach(function (c) {
      var url = new URL(c.path, siteUrl);
      if (c.soon) {
        items.push('<li><span class="ff-link ff-soon"><span class="ff-ic">' + esc(c.icon) + '</span>' + esc(c.title) + '<em>скоро</em></span></li>');
      } else {
        var cur = here.indexOf(url.pathname) === 0;
        items.push('<li><a class="ff-link' + (cur ? ' ff-current' : '') + '" href="' + esc(url.href) + '"' + (cur ? ' aria-current="page"' : '') + '><span class="ff-ic">' + esc(c.icon) + '</span>' + esc(c.title) + '</a></li>');
      }
    });
    return '<ul>' + items.join("") + '</ul>';
  }

  function build(data) {
    var header = document.querySelector("header");
    var html = listHtml(data);

    var side = document.createElement("aside");
    side.className = "ff-side";
    side.setAttribute("aria-label", "Категорії");
    side.innerHTML = '<p class="ff-title">Категорії</p>' + html;
    document.body.appendChild(side);

    var overlay = document.createElement("div");
    overlay.className = "ff-overlay";
    var menu = document.createElement("nav");
    menu.className = "ff-menu";
    menu.setAttribute("aria-label", "Категорії");
    menu.innerHTML = '<div class="ff-menu-head"><p class="ff-title">Категорії</p>' +
      '<button class="ff-close" aria-label="Закрити">✕</button></div>' + html;
    document.body.appendChild(overlay);
    document.body.appendChild(menu);

    var burger = document.createElement("button");
    burger.className = "ff-burger";
    burger.setAttribute("aria-label", "Меню категорій");
    burger.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
    var inner = header && (header.querySelector(".nav-inner") || header);
    if (inner) inner.insertBefore(burger, inner.firstChild);

    function open() { menu.classList.add("open"); overlay.classList.add("open"); }
    function close() { menu.classList.remove("open"); overlay.classList.remove("open"); }
    burger.addEventListener("click", open);
    overlay.addEventListener("click", close);
    menu.querySelector(".ff-close").addEventListener("click", close);
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

    function layout() {
      var h = header ? header.getBoundingClientRect().height : 0;
      document.documentElement.style.setProperty("--ff-header-h", h + "px");
      document.documentElement.classList.toggle("ff-has-side", DESKTOP.matches);
      if (DESKTOP.matches) close();
    }
    layout();
    window.addEventListener("resize", layout);
    if (DESKTOP.addEventListener) DESKTOP.addEventListener("change", layout);
  }
})();
