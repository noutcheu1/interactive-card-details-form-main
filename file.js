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
    // console.log(input, msg.innerText);
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


function splitNumber(chaine, number_of_split){
    let number_to_split = chaine
    let debut = 0;
    let end = number_of_split;
    let result = [];
    let count = (number_to_split.length / number_of_split);
    // console.log(count);

    while(count > 0){
        result.push(number_to_split.substring(debut, end) );
        debut = end 
        end = end + number_of_split
        
        // console.log(debut,' ', end, ' \n');
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



let _name = form['name'];
console.log(_name);
let card_number = form['number_card'];
let month = form['mm'];
let years = form['yy'];
let cvc = form['cvc'];

let cvc_card = document.querySelector(".cvc-card");
let date = document.querySelector(".date");
let field_name = document.querySelector(".name");


console.log(number);

card_number.addEventListener("focusout", (event)=>{
    let number = document.querySelector('#number');
    let field_number = card_number.value.replaceAll(' ','').toUpperCase(); 
    if (check_date_and_cvc(card_number, 16)) {
         
        console.log(field_number);  
        field_number = format_number(splitNumber(field_number, 4), 4)
        console.log(field_number);
   }
   list_number = format_number(splitNumber(field_number, 4), 4)
  
   console.log(field_number.length);
   let result = ""
   for (let i = 0; i < list_number.length; i++) {
        result += " "+ format_caractere(list_number[i], 4   );
    
   }
   number.innerHTML = result ;
   card_number.value = card_number.value.toUpperCase()

});

function format_number(list_number, decrease){
    let cpt = list_number.length
    
    number_tour =Math.abs(cpt - decrease)
    console.log(number_tour);
    if (number_tour==0) {
        return list_number
    } 
    let result = '';

    for (let i = 0; i < number_tour; i++) {
        
        list_number.push(' 0000') ;
        
    }

    return list_number
    
}
function format_caractere(str_input, decrease){
    let length_str = str_input.length;
    length_str = Math.abs(length_str - decrease)
    console.log(length_str);
    if (length_str > 2) {
        let str_output = "";
        while (length_str>0) {
            str_output += "0"
            length_str--;
        }
        return str_input + str_output;
    }
    return str_input;
    
}

    // console.log(format_number([], 4).replaceAll(',',' '));
    // console.log(format_number(['1234'], 4));
    // console.log(format_number(['1234', '0000'], 4));
    // console.log(format_number(['1234', '1234', '0000'], 4));
    // console.log(format_number(['1234', '1234', '1234', '0000'], 4));
    // console.log(format_number(['1234', '1234' ,'1354', '1234'], 4));
