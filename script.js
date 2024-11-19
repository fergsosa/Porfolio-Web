// import toggleTheme from "./js/toggleTheme.js";
import scrollSpy from "./js/scrollEspia.js";
import contactFormValidations from "./js/validacionForm.js";
import Calculadora from "./js/calculadora.js";
import GeneradorQR from "./js/GereadorQR.js";
import Tags from "./js/Tags.js";
// import ToDo from "./js/ToDo.js";
import ToDoList from "./js/ToDoList.js";
import ThemeDark from "./js/themeDark-02.js";
import Language from "./js/language.js";

document.addEventListener("DOMContentLoaded", (e) => {
  scrollSpy();
  contactFormValidations();
  Calculadora(".buttons > button", ".screen .last", ".screen .new");
  GeneradorQR("qr-form");
  Tags(".tags-input ul", ".tags-input input", ".btn-removeAll button");
  // ToDo("btnAdd", "ul.to-do-list");
  ToDoList("#lista", "#input", "#boton-enter");
  ThemeDark(".btn-mode-light", ".btn-mode-dark");

  Language("flags", "[data-section]");
});
