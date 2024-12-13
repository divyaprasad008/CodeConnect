const express = require("express");
const requestRouter = express.Router();
const { authenticateUser } = require('../middlewares/auth.js');
const Connection = require("../models/connection.model.js");
const User = require("../models/users.model.js");


requestRouter.post("/request/send/:status/:userId",authenticateUser,async(req,res)=>{
    try{
        let allowedStatus = ['interested','ignored'];
        let status = req.params.status;
        let toUserId = req.params.userId;
        let fromUserId = req.userDetails._id;

        if(!allowedStatus.includes(status)){
            throw new Error("Invalid connection request status");
        }

        // if(fromUserId==toUserId){
        //     throw new Error("Cannot send connection request to yourself")
        // }
        
        let toUser = await User.findById(toUserId);
        // console.log(toUser);
        if(!toUser){
            throw new Error("User not found")
        }

        let isExist = await Connection.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId, toUserId:fromUserId}
            ]
        })

        // console.log(isExist);
        if(isExist){
            return res.status(400).json({message:"connection request already exist"});
        }

        let connectionReq = new Connection({
            fromUserId,
            toUserId,
            status
        })
        let test = await connectionReq.save();

        let message = `You are interested in ${toUser.firstName}`;
        if(status=='ignored'){
            message = `You ignored ${toUser.firstName}`
        }
        res.send({success:true,message:message});

    } catch(err){
        res.status(500).send({message:err?.message || "Some error occured", name:err.name, errors:err.errors });
    }
})

requestRouter.post("/request/review/:status/:requestId", authenticateUser, async(req,res)=>{
    try {
        let {status, requestId} = req.params;
        let loggedInUserId = req.userDetails._id;
        let allowedStatus = ["accepted","rejected"];

        if(!allowedStatus.includes(status)){
            throw new Error("Invalid status")
        }

        let connectionReq = await Connection.findOne({
            _id : requestId,
            toUserId : loggedInUserId,
            status : "interested"
        })
    
        if(!connectionReq){
            throw new Error("Invalid connection request")
        }

        connectionReq.status=status;
        let result = await connectionReq.save();
        console.log(result)
        res.send({success:true,message:`You ${status} the connection request`});

    } catch (err) {
        res.status(500).send({message:err?.message || "Some error occured", name:err.name, errors:err.errors });
    }
})

module.exports = requestRouter;