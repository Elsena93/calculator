//Put var as current screen value
const screen = document.querySelector('.screen');

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
        if ((operand1 != false || operand1 === "0") && operand2filling == false) {
            screen.textContent = "";
            //Turn switch for defining operand2 so screen not resetted when user input operand2
            operand2filling = true;
        }

        screen.textContent += (item.target.dataset.key);
    }

    //Update for ac buttons
    if (item.target.classList.contains('ac')) {
        screen.textContent = "";
        operand1 = false;
        operand2 = false;
        operator = false; 
    }

    //Update for plus minus
    if (item.target.classList.contains('plus-minus')) {
        if (screen.textContent[0] != "-") {
            screen.textContent = "-" + screen.textContent;
        }

        else if (screen.textContent[0] == "-") {
            screen.textContent = screen.textContent.substring(1);
        }
    }
    
    //Update for .
    if (item.target.classList.contains('dot')) {
        if (screen.textContent.substring(0, screen.textContent.length-1).includes(".")) {
            return
        }
        
        else if (screen.textContent[screen.textContent.length - 1] != ".") {
            screen.textContent = screen.textContent +  ".";
        }

        else if (screen.textContent[screen.textContent.length - 1] == ".") {
            screen.textContent = screen.textContent.substring(0, screen.textContent.length-1);
        }
    }

    //Update for + - % * / (maybe =)
    if (item.target.classList.contains('operand')) {
        
        //Checking if screen is empty so no value could be stored
        if (screen.textContent == "") {
            console.log("please, input")
        }
        
        //Storing operand1 for the first time
        else if (operand1 == false && operand1 !== "0") {
            operand1 = screen.textContent;
            operator = item.target.textContent;
        }
        else if ((operand1 != false || operand1 === "0") && operand2 == false) {
            
            if (operand2filling!= false) {
                operand2 = screen.textContent;
                screen.textContent = "";
            }
            
            if ((operand2 != false || operand2 === "0") && operand2filling != false) {
                //Executing operate()
                screen.textContent = operate(operator, operand1, operand2);

                //resetting variables
                operand1 = screen.textContent; //operand1 values equal to last operation  result
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