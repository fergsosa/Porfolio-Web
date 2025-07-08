import scrollSpy from "./js/scrollEspia.js";
import contactFormValidations from "./js/validacionForm.js";
import ThemeDark from "./js/themeDark-02.js";
import Language from "./js/language.js";
import copiarCorreo from "./js/copiarCorreo.js";

document.addEventListener("DOMContentLoaded", (e) => {
  scrollSpy();
  contactFormValidations();
  ThemeDark(".btn-mode-light", ".btn-mode-dark");
  Language("flags", "[data-section]");
  copiarCorreo("textCopy", "btnText", "icoCopy");
});
