const express = require("express");
const Router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/BookController")
const { verifyTokenAndAdmin } = require("../middlewares/VerifyToken");


/**
 * @description Get all books
 * @route /api/books
 * @method GET
 * @access public
 */
Router.get("/", 
  getAllBooks
);

/**
 * @description Get  book byId
 * @route /api/book/:id
 * @method GET
 * @access public
 */
Router.get("/:id", getBookById);

/**
 * @description create new  book 
 * @route /api/books
 * @method POST
 * @access private
 */
Router.post("/", verifyTokenAndAdmin, createBook);

/**
 * @description Update  book 
 * @route /api/books/:id
 * @method PUT
 * @access private
 */
Router.put("/:id", verifyTokenAndAdmin, updateBook);

/**
 * @description delete book 
 * @route /api/books/:id
 * @method DELETE
 * @access public
 */
Router.delete("/:id", verifyTokenAndAdmin, deleteBook);

module.exports = Router;

