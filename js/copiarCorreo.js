const svgCopy = `
  <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px" fill="currentColor">
    <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-520q0-17 11.5-28.5T160-720q17 0 28.5 11.5T200-680v520h400q17 0 28.5 11.5T640-120q0 17-11.5 28.5T600-80H200Zm160-240v-480 480Z"/>
  </svg>`;

const svgCheck = `
  <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px" fill="lime">
    <path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z"/>
  </svg>`;

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
      .writeText($textCopy.textContent)
      .then(() => {
        $icoCopy.innerHTML = svgCheck;
        $btnText.textContent = "Copiado";
        setTimeout(() => {
          $icoCopy.innerHTML = svgCopy;
          $btnText.textContent = "Copiar";
        }, 3000);
      })
      .catch((err) => console.error("Error al copiar el texto:", err));
  };

  $btnText.addEventListener("click", copiarCorreoFn);
}
