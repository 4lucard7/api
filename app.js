const express = require("express");
const bookPath = require("./routes/Books");
const AuthorPath = require("./routes/Authors");
const AuthPath = require("./routes/Auth");
const UserPath = require("./routes/Users");
const PasswordPath = require("./routes/password");
const UploadPath = require("./routes/Uploads");
const logger = require("./middlewares/logger");
const {ErrorHandler, notFound} = require("./middlewares/error");
const dotenv = require("dotenv");
const path = require("path");
const connectToDb = require("./config/db");
const helmet = require("helmet");
const cors = require("cors");
dotenv.config();


//connection to db
connectToDb();



//Init App
const app = express();



//Apply Middlewares
app.use(express.json());
app.use(logger);
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, "images")))

//helmet 
app.use(helmet());

//cors Polics
app.use(cors({
    origin : "*"
}));

//Set view
app.set("view engine", "ejs");

//Routes
app.use("/api/books", bookPath);
app.use("/api/authors", AuthorPath);
app.use("/api/auth", AuthPath);
app.use("/api/users", UserPath);
app.use("/password", PasswordPath);
app.use("/api/upload", UploadPath);


//Error handler middlewares
app.use(notFound);
app.use(ErrorHandler);






//running server
const Port = process.env.PORT;
app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
})