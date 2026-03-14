export function validateForm(data){
    console.log("HELLO VALIDATION:" + Object.entries(data));
    const errors = [];
    let isValid = true;
    //validate first name
    if(data.fname.trim() == ""){
        console.log("no first name");
        errors.push("no first name");
    }
    //validate last name
    if(data.lname.trim() == ""){
        console.log("no last name");
        errors.push("no last name");
    }
    //validate email
    if(data.email.trim() == ""){
        console.log("email");
        errors.push("email");
    }
    const validMethods = ['PickUp', 'delivery']
    if(!validMethods.includes(data.method)){
        errors.push("method must be pickup or delivery");
    }
    const validPizzaSize = ['small', 'medium', 'large']
    if(!validPizzaSize.includes(data.size)){
        errors.push("Select pizza size");
    }
    console .log(errors);
    isValid = errors.length === 0;

    return {isValid, errors};
}