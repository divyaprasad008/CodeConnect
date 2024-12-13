const express = require("express");
const profileRouter = express.Router();
const { authenticateUser } = require('../middlewares/auth.js');
const User = require('../models/users.model.js');
const { profileEditValidation, passwordChangeValidation } = require("../utils/validation.js");
const bcrypt = require("bcrypt");

profileRouter.post("/profile/view", authenticateUser,async(req,res)=>{
    try {        
        res.send({success:true, message:'profile fetched successfully', user : req.userDetails});
    } catch (err) {
        res.status(500).send({message:err?.message || "Some error occured", name:err.name, errors:err.errors });
        
    }
})

profileRouter.patch("/profile/edit",authenticateUser,async(req,res)=>{
    try {
        profileEditValidation(req);

        let loggedInUser = req.userDetails;

        Object.keys(req.body).forEach(element => {
            loggedInUser[element] = req.body[element]
            // console.log(loggedInUser)
        });
        await loggedInUser.save()

        // User.findByIdAndUpdate(loggedInUser._id,);
        res.send({success:true,message:"Profile Updated successfully", data:loggedInUser});
    } catch (err) {
        res.status(500).send({message:err?.message || "Some error occured", name:err.name, errors:err.errors });
    }
})

profileRouter.patch("/profile/password",authenticateUser,async(req,res)=>{
    try {
        passwordChangeValidation(req);
        let password = req.body.password;
        let hashPassword = await bcrypt.hash(password, 10);
        let result = User.findByIdAndUpdate(req.userDetails._id,{password:hashPassword})
        console.log(result);
        res.send({success:true,message:"Password updated successfully"})
    } catch (err) {
        res.status(500).send({message:err?.message || "Some error occured", name:err.name, errors:err.errors });
    }
})

module.exports = profileRouter;