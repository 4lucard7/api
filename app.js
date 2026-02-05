const express = require("express");
const bookPath = require("./routes/Books");
const AuthorPath = require("./routes/Authors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


//connection to db
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to DB"))
.catch((err) => console.error("connection failed to mongoDB: " ,err));



//Init App
const app = express();



//Apply Middlewares
app.use(express.json());



//Routes
app.use("/api/books", bookPath);
app.use("/api/authors", AuthorPath);








//running server
const Port = process.env.Port;
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
})