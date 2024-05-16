const d = document;
// * selector de botones

export default function toggleTheme(btn, classDark) {
  const $themeBtn = d.querySelector(btn),
    $root = d.documentElement;

  $themeBtn.addEventListener("click", toggleMode);

  function toggleMode() {
    // const setTheme = ($themeBtn.style.display = "none" ? "dark" : "light");
    const displayBtn = $themeBtn.style.display;

    if (displayBtn === "none") {
      displayBtn = "block";
    } else {
      displayBtn = "none";
    }

    // const setTheme = (displayBtn = "none" ? "dark" : "light");

    // $root.setAttribute("data-theme", setTheme);
    // $root.setAttribute("data-theme", setTheme);
  }
}

//*
