const express = require('express')
const app = express();
const dbConnect = require('./config/database.js');
const User = require('./model/users.model.js');

// start the application once database is connected

app.use(express.json());

app.post("/signup",async(req,res)=>{
    try {
        console.log(req.body);
        let userData = new User(req.body)
        let storedUser = await userData.save();
        console.log(storedUser);
        res.send("User created successfully")
        
    } catch (err) {
        res.status(500).send({message:"Some Error Occured",error:err})
    }
});

dbConnect().then(()=>{
    console.log(`Database Connected`);
    
    app.listen(7777,()=>{
        console.log(`app started at port 7777`)
    });
}).catch((err)=>{
    console.log(`Db connection failed`)
})
