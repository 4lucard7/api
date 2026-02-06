const mongoose = require("mongoose");

async function connectToDb(){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to DB")
    } catch (error) {
        console.error("connection failed to mongoDB: " ,error)
    }
}


module.exports = connectToDb;