const mongoose = require("mongoose")
var validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim:true,
        minlength:2,
        maxlength:30
    },
    lastName:{
        type: String,
        required: true,
        trim:true,
        minlength:2,
        maxlength:30

    },
    email:{
        type: String,
        required: true,
        unique:true,
        trim:true,
        lowercase:true,
        maxlength:255,
        minlength:5,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email id")
            }
        }

    },
    password:{
        type: String,
        required: true,
        trim:true,
        minlength: 8

    },
    about:{
        type:String,
        trim:true,
        maxlength:300
    },
    gender:{
        type: String,
        trim:true,
        enum: ['Male','Female','Other']

    },
    age:{
        type: Number,
        min:15
    },
    skills:{
        type:[String],
        trim:true
    },
    photoURL:{
        type:String,
        trim:true,
        default:'https://www.transparentpng.com/details/gray-user-profile-icon-_33842.html'
    }
},
{
    timestamps:true
}

);


UserSchema.methods.verifyPassword = async function(password){
    let dbUser = this;
    let isCorrectPassword = await bcrypt.compare(password,dbUser.password);
    return isCorrectPassword;

}

UserSchema.methods.getJWT = async function(){
    let dbUser = this;
    let token = jwt.sign({ userId: dbUser._id }, "CODE_CONNECT_DIVYA_PRASAD")
    return token;
}

const User = mongoose.model("User",UserSchema);

module.exports = mongoose.model("User",UserSchema);
