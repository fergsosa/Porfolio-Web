const d = document;
const ls = localStorage;
export default function Language(btns, textsToChange) {
  const $flagsElement = d.getElementById(btns),
    $textsToChange = d.querySelectorAll(textsToChange);

  const changeLanguage = async (language) => {
    const requestJson = await fetch(`../lenguajes/${language}.json`);
    const texts = await requestJson.json();

    for (const textToChange of $textsToChange) {
      // console.log(textToChange);
      // console.log(textToChange.textContent);
      const section = textToChange.dataset.section;
      const value = textToChange.dataset.value;
      // console.log(section, ">", value);

      textToChange.innerHTML = texts[section][value];
      // textToChange.textContent = texts[section][value];
    }
    // console.log(texts);
  };
  $flagsElement.addEventListener("click", (e) => {
    const lang = e.target.parentElement.dataset.language;
    changeLanguage(lang);

    // Guardar el idioma seleccionado en localStorage
    ls.setItem("language", lang);
  });

  // Recuperar el idioma almacenado en localStorage cuando se carga la página
  const storedLanguage = ls.getItem("language");
  if (storedLanguage) changeLanguage(storedLanguage);
}
