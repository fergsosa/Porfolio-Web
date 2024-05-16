const d = document;
const ls = localStorage;

export default function Language(btns, textsToChange) {
  const $flagsElement = d.getElementById(btns);
  const $textsToChange = d.querySelectorAll(textsToChange);

  const changeLanguage = async (language) => {
    try {
      const requestJson = await fetch(`./lenguajes/${language}.json`);
      if (!requestJson.ok)
        throw new Error(`HTTP error! status: ${requestJson.status}`);

      const texts = await requestJson.json();

      for (const textToChange of $textsToChange) {
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;
        textToChange.innerHTML = texts[section][value];
      }
    } catch (error) {
      console.error("Error loading language file:", error);
    }
  };

  $flagsElement.addEventListener("click", (e) => {
    // Asegúrate de que `data-language` esté en el elemento correcto
    const lang = e.target.dataset.language;
    if (lang) {
      changeLanguage(lang);
      ls.setItem("language", lang);
    }
  });

  const storedLanguage = ls.getItem("language");
  if (storedLanguage) {
    changeLanguage(storedLanguage);
  }
}
