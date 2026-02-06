const {Book} = require("./models/Book")
const {Author} = require("./models/Author")
const {books,authors} = require("./data/data")
const dotenv = require("dotenv");
const connectToDB = require("./config/db");
dotenv.config();


//connection To Db

connectToDB();

//Import Books
const importBooks = async() => {
    try {
        await Book.insertMany(books);
        console.log("Books imported")
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

//Import Authors
const importAuthors = async() => {
    try {
        await Author.insertMany(authors);
        console.log("Authors imported")
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

//Remove Books
const removeBooks = async() => {
    try {
        await Book.deleteMany();
        console.log("Books deleted")
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

//Remove Authors
const removeAuthors = async() => {
    try {
        await Author.deleteMany();
        console.log("Authors deleted")
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


if(process.argv[2] === "-import"){
    importBooks();
}else if(process.argv[2] === "-remove"){
    removeBooks();
}else if(process.argv[2] === "-import-authors"){
    importAuthors();
}else if(process.argv[2] === "-remove-authors"){
    removeAuthors();
}