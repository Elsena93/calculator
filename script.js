//Put var as current screen value
const screen = document.querySelector('.screen');

//var to store screen value
let screenValue = "";

//Var to store operands
let operand1 = false;
let operand2 = false;

//Switch. It needed to stop resetting screen when user input operand2
let operand2filling = false;

//Var to store operator
let operator = false;

//Function to update screen
function updateScreen(item) {

    //Update screen with num buttons
    if (item.target.classList.contains('num')) {
        
        //Checking condition if its time to fill operand2
        if ((operand1 != false || operand1 === "0") && operand2filling == false && operator != false) {
            screenValue = "";
            screen.textContent = screenValue;
            //Turn switch for defining operand2 so screen not resetted when user input operand2
            operand2filling = true;
        }

        screenValue += (item.target.dataset.key);
        screen.textContent = screenValue;
    }

    //Update for ac buttons
    if (item.target.classList.contains('ac')) {
        screenValue = "";
        screen.textContent = screenValue;
        operand1 = false;
        operand2 = false;
        operator = false; 
    }

    //Update for plus minus
    if (item.target.classList.contains('plus-minus')) {
        if (screenValue[0] != "-") {
            screenValue = "-" + screenValue;
            screen.textContent = screenValue;
        }

        else if (screenValue[0] == "-") {
            screenValue = screenValue.substring(1);
            screen.textContent = screenValue;
        }
    }
    
    //Update for .
    if (item.target.classList.contains('dot')) {

        //Check if already dot there in middle of number
        if (screenValue.substring(0, screenValue.length-1).includes(".")) {
            return
        }
        
        else if (screenValue[screenValue.length - 1] != ".") {
            screenValue = screenValue +  ".";
            screen.textContent = screenValue;
        }

        else if (screenValue[screenValue.length - 1] == ".") {
            screenValue = screenValue.substring(0, screenValue.length-1);
            screen.textContent = screenValue;
        }
    }


    //Update for =
    if (item.target.classList.contains('equal')) {
        if ((operand1 != false || operand1 === "0") &&
        operator != false && operand2filling == true) {

            operand2 = screenValue;

            //Executing operate()
            screenValue = operate(operator, operand1, operand2);
            screen.textContent = screenValue;

            //resetting variables
            operand1 = screenValue; //operand1 values equal to last operation  result
            operand2 = false;
            operand2filling = false;
            operator = false;
        }
    }

    //Update for + - % * / 
    if (item.target.classList.contains('operand')) {
        
        //Checking if screen is empty so no value could be stored
        if (screenValue == "") {
            console.log("please, input")
        }
        
        //Storing operand1 for the first time
        else if (operand1 == false && operand1 !== "0") {
            operand1 = screenValue;
            operator = item.target.textContent;
        }
        else if ((operand1 != false || operand1 === "0") && (operand2 == false && operand2 !== "0")) {
            
            if (operand2filling!= false) {
                operand2 = screenValue;
                screenValue = "";
                screen.textContent = screenValue;
            }
            
            if ((operand2 != false || operand2 === "0") && operand2filling != false) {
                //Executing operate()
                screenValue = operate(operator, operand1, operand2);
                screen.textContent = screenValue;

                //resetting variables
                operand1 = screenValue; //operand1 values equal to last operation  result
                operand2 = false;
                operand2filling = false;
            }

            //Saving operator when operand1 already defined
            operator = item.target.textContent;
        }
    }
}

//Function to execute operand
function operate(operator, operand1, operand2) {
    let numFloat1 = parseFloat(operand1);
    let numFloat2 = parseFloat(operand2);

    switch (operator) {
        case '+':
            return numFloat1 + numFloat2;
            break;
        case '-':
            return numFloat1 - numFloat2;
            break;
        case '*':
            return numFloat1 * numFloat2;
            break;
        case '/':
            return numFloat1 / numFloat2;
            break;
        case '%':
            return numFloat1 % numFloat2;
            break;
    }
}

//Button could update screen
const number = document.querySelector('.number');
const a = Array.from(number.querySelectorAll('button'));
a.forEach(item => item.addEventListener('click', updateScreen))

//Button for others
const body = document.querySelector('body');
const b = Array.from(body.querySelectorAll('button'));
b.forEach(item => item.addEventListener('click', updateScreen))