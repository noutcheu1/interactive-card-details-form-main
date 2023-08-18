let form =  document.querySelector("#Myform");
const WRONG_FORMAT = "Wrong Format, number only";
const BLANK = "Can't be blank";
let formCard = document.querySelector("#form-card")
form.addEventListener("submit", (event)=>{
    event.preventDefault();
    // stop form submission
	
   let name = form['name'];
   console.log(name);
   let card_number = form['number_card'];
   let month = form['mm'];
   let years = form['yy'];
   let cvc = form['cvc'];
   send_form = true;
   if (!check_name(name)) {
        send_form = send_form&&false
   }
   if (!check_date_and_cvc(card_number, 16)) {
    send_form = send_form&&false
   } 
    if (!check_date_and_cvc(month, 2)){
        send_form = send_form&&false
    } 
   if (!check_date_and_cvc(years, 2)){
        send_form = send_form&&false
    } 
   
   if (!check_date_and_cvc(cvc, 3)){
        send_form = send_form&&false
    }
    if(send_form){
        formCard.innerHTML = `<div class="congratulation-card">
        <div class="logo"></div>
        <h1>Thank you!</h1>
        <p class="descritpion">We've added your card details</p>
        <div class="send">
          <button type="submit" href="#form-card">Continue</button>
        </div>
      </div>`
        
        form.submit();
    }
});


function showMessage(input, message, type){
    let msg = input.parentNode.querySelector("small");
	msg.innerText = message;
    console.log(input, msg.innerText);
}

function showError(input, message){
    let haveError = input.classList.contains('error')
    if(!haveError) input.classList.add('error');
    showMessage(input, message, true);
}
function removeError(input){
    let haveError = input.classList.contains('error')
    if(haveError) input.classList.remove('error');
    let msg =  input.parentNode.querySelector("small");
	msg.innerText = "";

}

function hasValue(input){
    if (input.value === "") {
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



function check_name(name) {
    if(hasValue(name)){
        removeError(name);
        return true;
    }

    console.log("show error");
    showError(name, BLANK);
    return false

}


function checkNumberFormat(number) {
    
    const regex = new RegExp("[a-zA-Z\W//]"); 
    // console.log("pattern find "+ number+" = "+ regex.test(number));
    if (regex.test(number)){
        // console.log("good"+number);
        return false;
    }
    // console.log("fake"+number);
    return true;
}


function check_date_and_cvc(cvc, number_digit){
    if (hasValue(cvc)){
        if(containtWrongNumber(cvc)){
            showError(cvc, WRONG_FORMAT);
            return false;
        }
        if (!checkDigitLength(cvc, number_digit)) {
            showError(cvc, "no more or less than "+number_digit+" digit"); 
            return false;
        }
        else{
            removeError(cvc);
            return true;
        
        }
        
    }
        
    

    showError(cvc, BLANK);
    return false

}


function containtWrongNumber(cvc) {
    if (checkNumberFormat(cvc.value)) {
        return false;
    }   
        
        return true;
}

function checkDigitLength(cvc, number_digit) {
    let str = cvc.value.replaceAll(' ' , '')
    if (str.length != number_digit) {
           
        return false;
    }

    removeError(cvc);
    return true;

    
}

