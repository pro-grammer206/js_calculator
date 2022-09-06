const inputs = [
  "CE",
  "C",
  "%",
  "/",
  "7",
  "8",
  "9",
  "*",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "+/-",
  "0",
  ".",
  "=",
];

const calc = document.getElementById("calc");
const display = document.getElementById("display");
let arr = [];
let calcValue = "";
let operation = "";
let operands = [];
let calcTrigger = 0;

let buttons;

function renderCalc() {
  calcValue = "";
  inputs.forEach(function (input) {
    const cbutton = document.createElement("button");
    cbutton.textContent = input;
    cbutton.classList.add("cbutton");
    calc.appendChild(cbutton);
  });
  buttons = document.querySelectorAll(".cbutton");
}
renderCalc();
buttons.forEach((button) =>
  button.addEventListener("click", (e) => {
    processAction(e.target.textContent);
    display.value = calcValue;
  })
);
function caclulate(numarr, operation) {
  let answer = 0;
  let num1 = parseInt(numarr[0]);
  let num2 = parseInt(numarr[1]);
  switch (operation) {
    case "+":
      answer = num1 + num2;
      break;
    case "-":
      answer = num1 - num2;
      break;
    case "*":
      answer = num1 * num2;
      break;
    case "/":
      answer = num1 / num2;
      break;
    case "%":
      answer = num1 % num2;
      break;
  }
  return answer;
}

function processAction(action) {
  switch (action) {
    case "CE":
      {
        calcValue = "";
        calcTrigger = 0;
        operation = "";
      }
      break;
    case "C":
      calcValue = calcValue.slice(0, calcValue.length - 1);
      break;
    case "+":
    case "-":
    case "/":
    case "*":
    case "%":
    case "=":
      if (
        calcValue[calcValue.length - 1] !== "+" &&
        calcValue[calcValue.length - 1] !== "-" &&
        calcValue[calcValue.length - 1] !== "*" &&
        calcValue[calcValue.length - 1] !== "/" &&
        calcValue[calcValue.length - 1] !== "%"
      ) {
        calcValue += action;
        calcTrigger++;
        if (calcTrigger == 1) operation = action;
        if (calcTrigger == 2 && action === "=") {
          const numarr = calcValue
            .slice(0, calcValue.length - 1)
            .split(operation);
          calcValue = caclulate(numarr, operation).toString();
          calcTrigger = 0;
        }
        if (calcTrigger == 2) {
          const lastop = calcValue[calcValue.length - 1];
          const numarr = calcValue
            .slice(0, calcValue.length - 1)
            .split(operation);
          calcValue = caclulate(numarr, operation).toString() + lastop;
          calcTrigger = 1;
        }
      }
      break;

    default:
      calcValue += action;
      break;
  }
}
