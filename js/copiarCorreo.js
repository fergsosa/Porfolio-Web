const svgCheck = `
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#34c759" viewBox="0 -960 960 960"><path d="m424-408-86-86q-11-11-28-11t-28 11-11 28 11 28l114 114q12 12 28 12t28-12l226-226q11-11 11-28t-11-28-28-11-28 11zm56 328q-83 0-156-31.5T197-197t-85.5-127T80-480t31.5-156T197-763t127-85.5T480-880t156 31.5T763-763t85.5 127T880-480t-31.5 156T763-197t-127 85.5T480-80"/></svg>`;

export default function copiarCorreo(textCopy, btnText, icoCopy) {
  const $textCopy = document.getElementById(textCopy);
  const $btnText = document.getElementById(btnText);
  const $icoCopy = document.getElementById(icoCopy);

  if (!$textCopy || !$btnText || !$icoCopy) {
    console.error("Uno o más elementos no existen en el DOM.");
    return;
  }

  const copiarCorreoFn = () => {
    navigator.clipboard
      .writeText($textCopy.textContent.trim())
      .then(() => {
        $icoCopy.innerHTML = svgCheck;
        $btnText.textContent = "copiado";
        setTimeout(() => {
          $icoCopy.innerHTML = "→";
          $btnText.textContent = "copiar";
        }, 3000);
      })
      .catch((err) => console.error("Error al copiar el texto:", err));
  };

  $btnText.addEventListener("click", copiarCorreoFn);
}
