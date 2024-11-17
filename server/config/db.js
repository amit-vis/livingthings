const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async ()=>{
    try {
        const dae = await mongoose.connect(process.env.mongoURL)
        if(dae){
            console.log("database connected suucessfully!")
        }
    } catch (error) {
        console.error("error in connecting to database", error)
    }
}

dbConnect()

module.exports = mongoose.connection;