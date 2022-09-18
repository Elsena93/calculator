//Put var as current screen value
const screen = document.querySelector('.screen');
let screenValue;

//Function to update screen
function updateScreen(item) {

    //Update for num buttons
    if (item.target.classList.contains('num')) {
        screen.textContent += (item.target.dataset.key);
    }

    //Update for ac buttons
    if (item.target.classList.contains('ac')) {
        screen.textContent = "";
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
}

//Button could update screen
const number = document.querySelector('.number');
const a = Array.from(number.querySelectorAll('button'));
a.forEach(item => item.addEventListener('click', updateScreen))

//Button for others
const body = document.querySelector('body');
const b = Array.from(body.querySelectorAll('button'));
b.forEach(item => item.addEventListener('click', updateScreen))