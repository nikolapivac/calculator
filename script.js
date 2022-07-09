const currentDisplay = document.querySelector('.curr_display');
const lastDisplay = document.querySelector('.last_display');
const numBtn = document.querySelectorAll('.number');
const opBtn = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');
const dlt = document.querySelector('.delete');
const clear = document.querySelector('.clear');

let op1 = "";
let op2 = "";
let operator = null;
let shouldResetScreen = false;

numBtn.forEach((btn) =>{
    btn.addEventListener("click", () => appendNumber(btn.textContent));
});

opBtn.forEach((btn) =>{
    btn.addEventListener("click", () => setOperation(btn.textContent));
});

clear.addEventListener("click", () => {
    currentDisplay.textContent = "0";
    lastDisplay.textContent = "";
    op1 = "";
    op2 = "";
    operator = null;
});

dlt.addEventListener("click", ()  => 
    currentDisplay.textContent = currentDisplay.textContent.toString().slice(0, -1)
);

equal.addEventListener("click", () => evaluate());

function resetScreen() {
    currentDisplay.textContent = '';
    shouldResetScreen = false;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

function appendNumber(number){
    if(currentDisplay.textContent === "0" || shouldResetScreen){
        resetScreen();
    }
    currentDisplay.textContent += number;
}

function setOperation(operation){
    if(operator!==null) evaluate();
    op1 = currentDisplay.textContent;
    operator = operation;
    lastDisplay.textContent = `${op1} ${operator}`;
    shouldResetScreen = true;
}

function evaluate(){
    if (operator == null) return;
    if (operator == "÷" && currentDisplay.textContent == "0"){
        alert("Cannot divide by 0");
        return;
    }
    op2 = currentDisplay.textContent;
    currentDisplay.textContent = roundResult(operate(operator, op1, op2));
    lastDisplay.textContent = `${op1} ${operator} ${op2} = `;
    operator = null;
}

function add(a, b){
    return a + b;
}

function sub(a, b){
    return a - b;
}

function mul(a, b){
    return a * b;
}

function div (a, b){
    return a / b;
}

function operate (operator, a, b){
    a = Number(a);
    b = Number(b);
    switch(operator){
        case '+':
            return add(a,b);
        case '-':
            return sub(a,b);
        case 'x':
            return mul(a, b);
        case '÷':
            if(b==0)return null;
            else return div(a, b);
        default:
            return null;
    }
}