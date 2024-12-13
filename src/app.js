const express = require('express')
const app = express();
const dbConnect = require('./config/database.js');
const cookieParser = require("cookie-parser");
const authRouter = require('./routes/auth.router.js');
const userRouter = require('./routes/user.router.js');
const profileRouter = require('./routes/profile.router.js');
const requestRouter = require('./routes/request.router.js');
const messageRouter = require('./routes/message.router.js');

app.use(express.json());
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",userRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",messageRouter);

// start the application once database is connected
dbConnect().then(()=>{
    console.log(`Database Connected`);
    
    app.listen(7777,()=>{
        console.log(`app started at port 7777`)
    });
}).catch((err)=>{
    console.log(`Db connection failed`)
})
