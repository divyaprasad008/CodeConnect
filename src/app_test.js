const express = require('express')
const app = express();


app.all("/user",(req,res, next)=>{
    let token = "abc"

    if(token != "abc"){
        res.status(401).send("Unauthorize Request Access!")
    }
    else{
        next();
    }
})

app.use("/",(err,req,res, next)=>{
    if(err){
        res.send(`1. Something went wrong - ${err}`);
    }
})

app.use("/service/info/:id/:detail",(req,res)=>{
    console.log(req.params)
    console.log(req.query)
    res.send("Services Info for id");
})

app.use("/service/info",(req,res)=>{
    res.send("Services Info");
})

app.use("/service",(req,res)=>{
    res.send("Services");
})

app.use("/user",(req,res, next)=>{
    console.log("Will go to next")
    throw new Error("Test")
    res.send("User Get")
})

app.post("/user",(req,res)=>{
    res.send("User Post");
    
})

app.delete("/user",(req,res)=>{
    res.send("User Deleted")
})


app.patch("/user",(req,res)=>{
    res.send("User Patched")
})

app.put("/user",(req,res)=>{
    res.send("User Put")
})
app.use("/",(err,req,res, next)=>{
    if(err){
        res.send(`Something went wrong - ${err}`);
    }
})

// app.use("/",(req,res)=>{
//     res.send("Home");
// })

app.listen(7777,()=>{
    console.log(`app started at port 7777`)
});
