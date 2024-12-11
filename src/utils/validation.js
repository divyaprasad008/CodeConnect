const validator = require('validator');
const signupValidation = (req) =>{

    let {firstName, lastName, email, password} = req.body;

    if(!firstName.trim() || !lastName.trim()){
        throw new Error("Name is not valid")
    }
    if(firstName.length<3 || lastName.length<3){
        throw new Error("Name should contain atleast 3 characters")
    }
    else if(!email){
        throw new Error("Email is missing");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Please enter a valid email");
    }
    else if(!validator.isStrongPassword(password,[minLength=> 8, minLowercase=> 1, minUppercase=> 1, minNumbers=> 1])){
        throw new Error("Please enter a strong password");
    }
}

module.exports = {
    signupValidation
}