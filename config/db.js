const mongoose = require("mongoose");

async function connectToDb(){
    try {
        const uri = process.env.MONGO_URL || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/api'
        await mongoose.connect(uri)
        console.log("Connected to DB")
    } catch (error) {
        console.error("connection failed to mongoDB: " ,error)
    }
}


module.exports = connectToDb;