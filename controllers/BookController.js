
const asyncHandler = require("express-async-handler");
const { Book, ValidationCreateBook, ValidationUpdateBook } = require("../models/Book");

const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();

  if (!books || books.length === 0) {
    return res.status(404).json({ message: "No books found" });
  }

  res.status(200).json(books);
});

const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) {
    return res.status(404).json({ message: "No book found" });
  }

  res.status(200).json(book);
});

const createBook = asyncHandler(async (req, res) => {
  const { error } = ValidationCreateBook(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const book = new Book({
    title: req.body.title,
    genre: req.body.genre,
    publishedYear: req.body.publishedYear,
    pages: req.body.pages,
    author: req.body.author,
  });

  const rest = await book.save();
  res.status(201).json(rest);
});

const updateBook = asyncHandler(async (req, res) => {
  const { error } = ValidationUpdateBook(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const rest = await Book.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
        genre: req.body.genre,
        publishedYear: req.body.publishedYear,
        pages: req.body.pages,
        author: req.body.author,
      },
    },
    { new: true }
  );

  res.status(200).json(rest);
});

const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.status(200).json({ message: "Book has been deleted" });
});

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};



