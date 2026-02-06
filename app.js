const express = require("express");
const bookPath = require("./routes/Books");
const AuthorPath = require("./routes/Authors");
const AuthPath = require("./routes/Auth");
const UserPath = require("./routes/Users");
const logger = require("./middlewares/logger");
const {ErrorHandler, notFound} = require("./middlewares/error");
const dotenv = require("dotenv");
const connectToDb = require("./config/db");
dotenv.config();


//connection to db
connectToDb();



//Init App
const app = express();



//Apply Middlewares
app.use(express.json());
app.use(logger);




//Routes
app.use("/api/books", bookPath);
app.use("/api/authors", AuthorPath);
app.use("/api/auth", AuthPath);
app.use("/api/users", UserPath);


//Error handler middlewares
app.use(notFound);
app.use(ErrorHandler);






//running server
const Port = process.env.PORT;
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
})