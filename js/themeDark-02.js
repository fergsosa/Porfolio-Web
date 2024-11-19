const d = document;

export default function ThemeDark(btnLigth, btnDark) {
  const $btnModeLight = d.querySelector(btnLigth),
    $btnModeDark = d.querySelector(btnDark);

  //* Cambia si es light o dark
  const setUserTheme = (newTheme) => {
    d.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  //* Activar tema
  const setModeDark = () => setUserTheme("dark");
  const setModeLight = () => setUserTheme("light");

  //* Eventos
  $btnModeLight.addEventListener("click", setModeDark);
  $btnModeDark.addEventListener("click", setModeLight);
}
//*
