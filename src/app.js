const express = require('express')
const app = express();
const dbConnect = require('./config/database.js');
const User = require('./models/users.model.js');
const {signupValidation} = require('./utils/validation.js')
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { authenticateUser } = require('./middlewares/auth.js');


// start the application once database is connected

app.use(express.json());
app.use(cookieParser());
app.post("/signup",async(req,res)=>{
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

app.post("/login",async (req,res)=>{
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

// get all users for the feed
app.get("/feed",async (req, res)=>{
    let allUsers = await User.find()
    if(allUsers.length===0){
        res.status(404).send({success:false,message:"Record not found"});
    }
    else{
        res.send({data:allUsers})

    }
})

// find user by email
app.get("/user",async(req,res)=>{
    let userEmail = req.body.email;
    let userData = await User.findOne({email:userEmail})
    if(userData.length===0){
        res.status(404).send({success:false,message:"Record not found"});
    }
    else{
        res.send({data:userData})
    }
})

//delete user
app.delete("/user", async(req, res)=>{
    let userId = req.body.userId;
    let result  = User.deleteOne(userId)
    result.then(function(result){
        console.log(result)
        res.send({"success":result.acknowledged,"deleteCount":result.deletedCount,"message":"User deleted successfully"})

    }).catch(function(err){
        res.status(500).send({message:err?.message || "User delete failed", name:err.name, errors:err.errors });

    })
})

app.patch("/user/:userId",async(req,res)=>{
    let userId = req.params?.userId;
    let data = req.body;
    console.log(data);
    try {
        const notAllowedUpdates = ["email"];
        const allowedUpdates = ["firstName", "lastName","password","about","gender","age","skills","photoURL"];
        const isUpdateAllowed = Object.keys(data).every((k) => 
            allowedUpdates.includes(k)
        )
        console.log(isUpdateAllowed);
        if(!isUpdateAllowed){
            throw new Error(`Update not allowed for ${notAllowedUpdates}`);
        }

        let result = User.findByIdAndUpdate(userId,data,{returnDocument:'after', runValidators:true})
        // res.send("User Updated Successfully");
        result.then(function(result){
            res.send({result});
        }).catch(function(err){
            throw new error("Some Error Occured");
        })
    } catch (err) {
        res.status(500).send({message:err?.message || "Some Error Occured", name:err.name, errors:err.errors });
        
    }
})

app.post("/profile", authenticateUser,async(req,res)=>{
    try {
        // let {token} = req.cookies;
        // let tokenData = await jwt.verify(token,"CODE_CONNECT_DIVYA_PRASAD")
        // console.log(tokenData)
        // let {userId} = tokenData;
        
        console.log(req.userDetails);
        
        res.send({success:true, message:'profile fetched successfully', user : req.userDetails});
    } catch (err) {
        res.status(500).send({message:err?.message || "Some error occured", name:err.name, errors:err.errors });
        
    }
})

dbConnect().then(()=>{
    console.log(`Database Connected`);
    
    app.listen(7777,()=>{
        console.log(`app started at port 7777`)
    });
}).catch((err)=>{
    console.log(`Db connection failed`)
})
