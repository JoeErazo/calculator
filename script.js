let firstNumber = "";
let operator = "";
let secondNumber = "";
let operatorActive = false;
let pressedEqual = false;
const calcDisplay = document.querySelector("#calc-display");
const numericals = "0123456789.";

function add(a, b){
  return Number(a) + Number(b);
}

function subtract(a, b){
  return a - b;
}

function multiply(a, b){
  return a * b;
}

function divide(a , b){
  return a / b;
}

function operate(a, op, b){
  switch (op) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case 'x':
      return multiply(a, b);
    case '/':
      // send a message to users trying to divide by zero
      if(b == 0) return ">:(";
      return divide(a, b);
    default:
      return "Error";
  } 
}

function roundToDisplay(number){
  // round to specific number of decimal places
  let sigFig;
  if(number > 1000000 || number < -1000000){
    sigFig = number.toString().length - 3;
    return (Math.round(Number(number) / (10**sigFig)) * (10**sigFig)).toExponential();
  }
  else{
    sigFig = 6;
    return Math.round(Number(number)*(10**sigFig)) / (10**sigFig);
  }
}

function displayValue(value){
  let displayed = value;
  // round long numbers to fit display
  if(value.toString().length > 7){
    displayed = roundToDisplay(value);
  }
  calcDisplay.textContent = displayed;
}

function clearDisplay(){
  calcDisplay.textContent = "";
}

function reset(){
  firstNumber = "";
  secondNumber = "";
  operator = "";
  operatorActive = false;
}

function registerInput(){
  if(this.value === "clr"){
    if(secondNumber){
      secondNumber = "";
      clearDisplay();
    }
    else{
      reset();
      clearDisplay();
    }
    return;
  }

  if(!operatorActive){
    if(numericals.includes(this.value)){
      if(this.value == "."){
        // add 0 to left of decimal point
        if(secondNumber === "") secondNumber += "0.";
        // add decimal point only once
        else if(!secondNumber.includes(".")) secondNumber += ".";
      }
      else secondNumber += this.value;
      displayValue(secondNumber);
      pressedEqual = false;
    }
    else if(this.value === "="){
      if(firstNumber !== "" && !operatorActive){
        firstNumber = operate(firstNumber, operator, secondNumber);
        displayValue(firstNumber);
        secondNumber = "";
        operatorActive = !operatorActive;
        pressedEqual = true;
      }
    }
    else{
      // handle chained operations
      if(firstNumber !== "" && secondNumber){
        firstNumber = operate(firstNumber, operator, secondNumber);
        displayValue(firstNumber);
      }
      else{
        firstNumber = secondNumber;
      }
      operator = this.value;
      operatorActive = !operatorActive;
      secondNumber = "";
    }
  }
  else{
    if(numericals.includes(this.value)){
      // reset operation if pressing a number after equals
      if(pressedEqual) firstNumber = "";
      // add 0 to left of decimal point
      if(this.value == ".") secondNumber += "0";
      operatorActive = !operatorActive;
      secondNumber += this.value;
      displayValue(secondNumber);
      pressedEqual = false;
    }
    // prevent setting operator to "="
    else if(this.value != "="){
      operator = this.value;
      pressedEqual = false;
    }
  }
  
  // reset values after user tries to divide by zero
  if(firstNumber == ">:(") reset();
}

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", registerInput);
});

document.querySelector("body").addEventListener("keydown",(e) => {
  switch(e.key){
    case "1":
      registerInput.bind(document.querySelector("#one"))();
      break;
    case "2":
      registerInput.bind(document.querySelector("#two"))();
      break;
    case "3":
      registerInput.bind(document.querySelector("#three"))();
      break;
    case "4":
      registerInput.bind(document.querySelector("#four"))();
      break;
    case "5":
      registerInput.bind(document.querySelector("#five"))();
      break;
    case "6":
      registerInput.bind(document.querySelector("#six"))();
      break;
    case "7":
      registerInput.bind(document.querySelector("#seven"))();
      break;
    case "8":
      registerInput.bind(document.querySelector("#eight"))();
      break;
    case "9":
      registerInput.bind(document.querySelector("#nine"))();
      break;
    case "0":
      registerInput.bind(document.querySelector("#zero"))();
      break;
    case "+":
      registerInput.bind(document.querySelector("#plus"))();
      break;
    case "-":
      registerInput.bind(document.querySelector("#minus"))();
      break;
    case "*":
      registerInput.bind(document.querySelector("#times"))();
      break;
    case "/":
      registerInput.bind(document.querySelector("#divide"))();
      break;
    case "Enter":
    case "=":
      registerInput.bind(document.querySelector("#equals"))();
      break;
    case "Backspace":
      registerInput.bind(document.querySelector("#clear"))();
      break;
  }
});
