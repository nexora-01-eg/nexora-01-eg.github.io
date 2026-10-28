/* Mohamed Sadek CV — small progressive enhancements.
   No framework, no dependencies. Everything works without JS:
   reveal-on-scroll and archive filtering are enhancements only. */
(function () {
  "use strict";
  var docEl = document.documentElement;
  docEl.classList.add("js");

  /* ----- reveal on scroll (skipped for reduced motion) ----- */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = Array.prototype.slice.call(document.querySelectorAll(".rv"));
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ----- theme toggle (light/dark) -----
     The head inline script already applied the saved/system theme before
     first paint; this only handles the interactive switch. */
  var themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    var syncThemeBtn = function () {
      var dark = docEl.getAttribute("data-theme") === "dark";
      themeBtn.setAttribute("aria-pressed", String(dark));
      /* accessible name starts with the visible glyph (a11y: label-content-name-mismatch) */
      themeBtn.setAttribute("aria-label",
        (dark ? "\u2600 " : "\u263E ") + (dark ? "\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u0641\u0627\u062A\u062D \u00B7 Light mode" : "\u0627\u0644\u0648\u0636\u0639 \u0627\u0644\u062F\u0627\u0643\u0646 \u00B7 Dark mode"));
    };
    syncThemeBtn();
    themeBtn.addEventListener("click", function () {
      var toDark = docEl.getAttribute("data-theme") !== "dark";
      docEl.setAttribute("data-theme", toDark ? "dark" : "light");
      try { localStorage.setItem("ms-cv-theme", toDark ? "dark" : "light"); } catch (e) {}
      syncThemeBtn();
    });
  }

  /* ----- language toggle (EN/AR) -----
     The head inline script already set lang/dir/pref before first paint;
     this only handles the interactive switch. */
  var TITLES = {
    en: "Mohamed Sadek — AI-Assisted Digital Project Builder · CV & Portfolio",
    ar: "محمد صادق — باني مشاريع رقمية بمساعدة الذكاء الاصطناعي · السيرة والأعمال"
  };

  function applyTitle() {
    var lang = docEl.lang === "ar" ? "ar" : "en";
    document.title = TITLES[lang];
  }
  applyTitle();

  var langBtn = document.getElementById("lang-toggle");
  if (langBtn) {
    langBtn.addEventListener("click", function () {
      var toAr = docEl.lang !== "ar";
      docEl.lang = toAr ? "ar" : "en";
      docEl.dir = toAr ? "rtl" : "ltr";
      try { localStorage.setItem("ms-cv-lang", toAr ? "ar" : "en"); } catch (e) {}
      applyTitle();
    });
  }

  /* ----- archive filtering ----- */
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".filterbar button"));
  var rows = Array.prototype.slice.call(document.querySelectorAll("#archive-list > li"));
  var empty = document.getElementById("archive-empty");
  if (!buttons.length || !rows.length) return;

  function applyFilter(cat) {
    var shown = 0;
    rows.forEach(function (li) {
      var show = cat === "all" || li.getAttribute("data-cat") === cat;
      li.hidden = !show;
      if (show) shown++;
    });
    if (empty) empty.hidden = shown !== 0;
  }

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      applyFilter(btn.getAttribute("data-filter") || "all");
    });
  });
})();
