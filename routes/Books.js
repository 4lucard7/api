const express = require("express");
const Router = express.Router();
const asyncHandler = require("express-async-handler");
const {Book, ValidationCreateBook, ValidationUpdateBook, } = require("../models/Book");


/**
 * @description Get all books
 * @route /api/books
 * @method GET
 * @access public
 */
Router.get("/", asyncHandler(async (req, res) => {

    const books = await Book.find();

    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    res.status(200).json(books);
  })
);

/**
 * @description Get  book byId
 * @route /api/book/:id
 * @method GET
 * @access public
 */
Router.get("/:id", asyncHandler(async (req, res) => {
    
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "No book found" });
    }

    res.status(200).json(book);
  })
);

/**
 * @description create new  book 
 * @route /api/books
 * @method POST
 * @access public
 */
Router.post("/", asyncHandler(async (req, res) => {
    
    const {error} = ValidationCreateBook(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message});
    }

    const book = new Book({
        title : req.body.title,
        genre : req.body.genre,
        publichedYear : req.body.publichedYear,
        pages : req.body.pages
    })

    const rest = await book.save();
    res.status(201).json(rest);
  })
);

/**
 * @description Update  book 
 * @route /api/books
 * @method PUT
 * @access public
 */
Router.put("/", asyncHandler(async (req, res) => {
    
    const {error} = ValidationUpdateBook(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message});
    }

    const rest = await Book.findByIdAndUpdate(req.params.id,{
        $set : {
            title : req.body.title,
            genre : req.body.genre,
            publichedYear : req.body.publichedYear,
            pages : req.body.pages
        }
    }

    );
    res.status(201).json(rest);
  })
);

/**
 * @description delete book 
 * @route /api/books/:id
 * @method DELETE
 * @access public
 */
Router.delete("/:id", asyncHandler(async (req, res) => {
    
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book has been deleted" });
  })
);

module.exports = Router;

