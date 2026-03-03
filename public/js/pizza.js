const doc =document.getElementById("pizza-form");

doc.onsubmit = () => {
    clearErrors();
    let isValid = true;
    
    let fName = document.getElementById("fname").value.trim();
    let lName = document.getElementById("lname").value.trim();
    let Email = document.getElementById("email").value.trim();

    let pickUp = document.getElementById("PickUp");
    let delivery = document.getElementById("delivery");
    
    if(!fName){
        document.getElementById("err-fname").style.display = "block" ;
        isValid =false;
    }
    if(!lName){
        document.getElementById("err-lname").style.display = "block";
        isValid =false;
    }
    if(!Email){
        document.getElementById("err-email").style.display = "block";
        isValid =false;
    }
    if(!pickUp.checked && !delivery.checked){
        document.getElementById("err-method").style.display = "block";
        isValid = false;
    }
    isValid = true;
    return isValid;
}

function clearErrors(){
    let errors = document.getElementsByClassName("err");
    for(er of errors){
        er.style.display = "none"
    }
}


