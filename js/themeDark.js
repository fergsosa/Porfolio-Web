const d = document,
  // * selector de botones
  $btnModeLight = d.querySelector(".btn-mode-light"),
  $btnModeDark = d.querySelector(".btn-mode-dark");

// * al click se active el tema
$btnModeLight.addEventListener("click", setModeDark);
$btnModeDark.addEventListener("click", setModeLight);

// * funcion para activar
function setModeDark() {
  setUserTheme("dark");
  localStorage.setItem("dark");
}
function setModeLight() {
  setUserTheme("light");
  localStorage.setItem("ligth");
}

// * cambia si es light o dark
function setUserTheme(newTheme) {
  d.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
}
