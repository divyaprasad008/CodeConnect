const mongoose = require("mongoose");

const dbConnect = async() =>{
    await mongoose.connect("mongodb+srv://admin:admin@cluster0.xglzz.mongodb.net/codeconnect")
}

module.exports = dbConnect;