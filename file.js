let form =  document.querySelector("#Myform");
console.log(form);

const WRONG_FORMAT = "Wrong Format, number only";
const BLANK = "Can't be blank";


function check_name(name) {
    if(hasValue(name)){
        removeError(name);
        return true;
    }
    showError(name, BLANK);
    return false

}


function check_card_number(number) {
    if (Number.isNaN(parseInt(number))){
        return false;
    }
    return true;
}


function check_number(number){
    if (hasValue(number.value)){
        if(check_card_number(number.value)){
            showError(month, WRONG_FORMAT);
            return false;
        }
        removeError(number);
        return true;
    }

    showError(month, BLANK);
    return false;
        
}


function check_cvc(cvc){
    if (check_number(cvc)) {
        if (cvc.value.length == 3) {
            removeError(cvc)
            return true;
        }
    }
    showError(cvc, "no more or less than three digit");
    return false

}

form.addEventListener("submit", (event)=>{
    // stop form submission
	
   let name = form['name'];
   
   let card_number = form['number_card'];
   let month = form['mm'];
   let years = form['yy'];
   let cvc = form['cvc'];
   console.log(form['name']);
   if (
    check_card_number(month) && check_card_number(years) && 
    check_card_number(card_number) && check_name(name) && check_cvc(cvc)
    ){
        return event.currentTarget();
    }
   return false;
});

function showMessage(input, message, type){
    input.parentNode.querySelector("small");
	msg.innerText = message;
}

function showError(input, message){
    showMessage(input, message, true);
}
function removeError(input){
    input.parentNode.querySelector("small");
	msg.innerText = "";
}

function hasValue(input){
    if (input.value.trim() === "") {
        return false;
    }
    return true;
}


function splitNumber(chaine, number_split){
    let number_to_split = "000"
    let debut = 0;
    let end = number_split;
    let result = " ";
    let count = chaine.length / number_split;
    console.log(count);

    while(count >= 0){
        result = result + " " + number_to_split.substring(debut, end)
        debut = end 
        end = end + chaine
        count--;
    }
    return result;
}
