const express = require('express')
const app = express();



app.use("/service",(req,res)=>{
    res.send("Services");
})

app.use("/",(req,res)=>{
    res.send("Home");
})

app.listen(7777,()=>{
    console.log(`app started at port 7777`)
});
