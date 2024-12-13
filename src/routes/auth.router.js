const express = require("express");
const authRouter = express.Router();

const bcrypt = require('bcrypt');
const User = require('../models/users.model.js');
const {signupValidation} = require('../utils/validation.js');




authRouter.post("/signup",async(req,res)=>{
    try {
        // validate req.body
        signupValidation(req);
        // encrypt password
        let {firstName, lastName, email, password} = req.body;
        let hashPassword = await bcrypt.hash(password, 10);

        console.log(hashPassword);
        let storeData = {
            firstName,
            lastName,
            email,
            password:hashPassword
        }
        let userData = new User(storeData)

        let storedUser = await userData.save();
        
        res.send({success:true,message:"User created successfully"})
        
    } catch (err) {
        res.status(500).send({message:err?.message || "Some Error Occured", name:err.name, errors:err.errors })
    }
});

authRouter.post("/login",async (req,res)=>{
    try {
        let {email, password} = req.body;
        let dbUser = await User.findOne({email,email});
        if(dbUser.length===0){
            throw new Error("User not registered");
        }
        else{
            let isCorrectPassword = await dbUser.verifyPassword(password);
            if(isCorrectPassword){  
                $token = await dbUser.getJWT();
                res.cookie('token',$token);
                res.send({success : true, message : "Login successful", userDetails : dbUser});
            }
            else{
                throw new Error("Invalid credentials");
            }
        }
    } catch (err) {
        res.status(500).send({message:err?.message || 'Some error occured', success:false, name:err.name, errors:err.errors})
    }
})

authRouter.post("/logout",async(req,res)=>{
    res.clearCookie('token').send({message:"Logout successfull"})
})

module.exports = authRouter;
