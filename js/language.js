export default function Language(btns, textsToChange) {
  const $flagsElement = document.getElementById(btns);
  const $textsToChange = document.querySelectorAll(textsToChange);

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
    //* Asegúrate de que `data-language` esté en el elemento correcto
    const lang = e.target.parentElement.dataset.language;

    if (lang) {
      changeLanguage(lang);
      localStorage.setItem("language", lang);
    }
  });

  const storedLanguage = localStorage.getItem("language");
  if (storedLanguage) changeLanguage(storedLanguage);
}
