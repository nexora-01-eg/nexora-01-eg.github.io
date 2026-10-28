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
