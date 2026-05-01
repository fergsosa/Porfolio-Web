import showSlider from "./js/carousel.js";
import language from "./js/language.js";
import { revealObserver, toggleObserver } from "./js/scroll-observer.js";

document.addEventListener("DOMContentLoaded", (e) => {
  // language("flags", "[data-section]");
  language("flags", "[data-value]");

  revealObserver(".animation", { className: "revealed", threshold: 0.2 });
  revealObserver(".animation.stagger", {
    stagger: 100, // cada card espera 80ms más que la anterior
    maxStagger: 500, // en listas de 10+ cards, el delay no supera 400ms
  });
  revealObserver(".animation.fade-up-hidden", {
    className: "revealed",
    threshold: 0.3,
  });

  toggleObserver("#animation-menu-trigger", ".menu", {
    className: "scroll-menu",
    rootMargin: "130px 0px 0px 0px",
  });

  showSlider();
});
