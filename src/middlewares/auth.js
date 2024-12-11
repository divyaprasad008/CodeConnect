const jwt = require("jsonwebtoken");
const User = require("../models/users.model.js")
// const User = require('./models/users.model.js');


const authenticateUser = async (req,res, next) => {
    try {
        let {token} = req.cookies;
        if(!token){
            throw new Error("Missing token !!");
        }
        let tokenData = jwt.verify(token,"CODE_CONNECT_DIVYA_PRASAD")
        let {userId} = tokenData;
        
        let userDetails = await User.findById(userId);
        if(!userDetails){
            throw new Error("User not found");
        }

        req.userDetails = userDetails;
        next();
    } catch (err) {
        res.status(500).send({success:false,message:err?.message || "Some error occured while authenticating user", name:err.name, errors:err.errors });
    }
}

module.exports = {authenticateUser}