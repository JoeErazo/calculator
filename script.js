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

function round(number){
  // round to 6 decimal places
  return Math.round(Number(number)*(10**6)) / (10**6);
}

function displayValue(value){
  calcDisplay.textContent = round(value);
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

