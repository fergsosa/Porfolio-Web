const d = document;

export default function Calculadora(btn, screenLast, screenNew) {
  const $listButtons = d.querySelectorAll(btn),
    $lastReturn = d.querySelector(screenLast),
    $newReturn = d.querySelector(screenNew);

  let firstNumber = null;
  let newNumber = null;
  let calculator = "+";

  $listButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let value = button.innerText;
      // console.log([typeof value], value);
      switch (value) {
        case (value.match(/[0-9]/) || {}).input:
          // añadir número en lastNumber
          newNumber = newNumber !== null ? newNumber + value : value;
          newNumber = Number(newNumber);
          break;
        case ".":
          newNumber = newNumber !== null ? newNumber + value : "0.";
          break;
        case "±":
          newNumber = -1 * newNumber;
          break;
        case "%":
          newNumber = 0.01 * newNumber;
          break;
        case (value.match(/[\+|\-|\x|\÷]/) || {}).input:
          if (newNumber) {
            if (firstNumber) {
              applyCalculator();
            }

            calculator = value;
            firstNumber = newNumber;
            newNumber = null;
          }
          break;
        case "=":
          applyCalculator();
          firstNumber = null;
          break;
        case "AC":
          firstNumber = null;
          newNumber = null;
          calculator = "+";
          break;
      }
      // console.log({ firstNumber, newNumber });

      reloadScreen();
    });
  });
  const applyCalculator = () => {
    switch (calculator) {
      case "+":
        newNumber = firstNumber + newNumber;
        break;
      case "-":
        newNumber = firstNumber - newNumber;
        break;
      case "x":
        newNumber = firstNumber * newNumber;
        break;
      case "÷":
        newNumber = (firstNumber / newNumber).toFixed(5);
        break;
    }
  };
  const reloadScreen = () => {
    $lastReturn.innerText =
      firstNumber !== null ? firstNumber + "" + calculator : "";

    $newReturn.innerText = newNumber !== null ? newNumber : "";
  };
}
