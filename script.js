import language from "./js/language.js";
import { revealObserver, toggleObserver } from "./js/scroll-observer.js";

document.addEventListener("DOMContentLoaded", (e) => {
  language("flags", "[data-section]");
  revealObserver(".animation", { className: "revealed", threshold: 0.2 });
  revealObserver(".animation.fade-up-hidden", {
    className: "revealed",
    threshold: 0.3,
  });

  toggleObserver("#animation-menu-trigger", ".menu", {
    className: "scroll-menu",
    rootMargin: "130px 0px 0px 0px",
  });
});
