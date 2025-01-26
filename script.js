let firstNumber = "";
let operator = "";
let secondNumber = "";
let operatorActive = false;
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
      if(b == 0) return ">:(";
      return divide(a, b);
    default:
      return "Error";
  } 
}

function displayValue(value){
  calcDisplay.textContent = value;
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
  // clear button
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

  // number last pressed
  if(!operatorActive){
    // number pressed
    if(numericals.includes(this.value)){
      if(this.value == "." && secondNumber === "") secondNumber += "0";
      secondNumber += this.value;
      displayValue(secondNumber);
    }
    // equal button
    else if(this.value === "="){
      if(firstNumber !== "" && !operatorActive){
        firstNumber = operate(firstNumber, operator, secondNumber);
        displayValue(firstNumber);
        secondNumber = "";
        operatorActive = !operatorActive;
      }
    }
    // arithmetic operator
    else{
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
  // operator last pressed
  else{
    if(numericals.includes(this.value)){
      operatorActive = !operatorActive;
      if(this.value == ".") secondNumber += "0";
      secondNumber += this.value;
      displayValue(secondNumber);
    }
    else{
      operator = this.value;
    }
  }
  
  // dividing by zero
  if(firstNumber == ">:(") reset();
}

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", registerInput);
});

