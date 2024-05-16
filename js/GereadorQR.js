export default function GeneradorQR(qrForm) {
  const $formulario = document.getElementById(qrForm);

  const QR = new QRCode(contenedorQR);

  $formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    QR.makeCode($formulario.link.value);
  });
}
