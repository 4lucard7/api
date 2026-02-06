const asyncHandler = require("express-async-handler");
const Author = require("../models/Author");
const {
  ValidationCreateAuthor,
  ValidationUpdateAuthor,
} = require("../models/Author");

/**
 * @desc Get all authors
 * @route GET /api/authors
 * @access Public
 */
const getAllAuthors = asyncHandler(async (req, res) => {
  const authors = await Author.find();

  if (authors.length === 0) {
    return res.status(404).json({ message: "No authors found" });
  }

  res.status(200).json(authors);
});

/**
 * @desc Get author by ID
 * @route GET /api/authors/:id
 * @access Public
 */
const getAuthorById = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);

  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }

  res.status(200).json(author);
});

/**
 * @desc Create new author
 * @route POST /api/authors
 * @access Private (Admin)
 */
const createAuthor = asyncHandler(async (req, res) => {
  const { error } = ValidationCreateAuthor(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const author = new Author({
    name: req.body.name,
    country: req.body.country,
    birthYear: req.body.birthYear,
  });

  const result = await author.save();
  res.status(201).json(result);
});

/**
 * @desc Update author
 * @route PUT /api/authors/:id
 * @access Private (Admin)
 */
const updateAuthor = asyncHandler(async (req, res) => {
  const { error } = ValidationUpdateAuthor(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const author = await Author.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      country: req.body.country,
      birthYear: req.body.birthYear,
    },
    { new: true }
  );

  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }

  res.status(200).json(author);
});

/**
 * @desc Delete author
 * @route DELETE /api/authors/:id
 * @access Private (Admin)
 */
const deleteAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findByIdAndDelete(req.params.id);

  if (!author) {
    return res.status(404).json({ message: "Author not found" });
  }

  res.status(200).json({ message: "Author has been deleted" });
});

module.exports = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
