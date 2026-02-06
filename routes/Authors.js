const express = require("express");
const router = express.Router();

const {
  verifyTokenAndAdmin,
} = require("../middlewares/VerifyToken");

const {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");

/**
 * @description Get all authors
 * @route GET /api/authors
 * @access Public
 */
router.get("/", getAllAuthors);

/**
 * @description Get author by ID
 * @route GET /api/authors/:id
 * @access Public
 */
router.get("/:id", getAuthorById);

/**
 * @description Create new author
 * @route POST /api/authors
 * @access Private (Admin)
 */
router.post("/", verifyTokenAndAdmin, createAuthor);

/**
 * @description Update author
 * @route PUT /api/authors/:id
 * @access Private (Admin)
 */
router.put("/:id", verifyTokenAndAdmin, updateAuthor);

/**
 * @description Delete author
 * @route DELETE /api/authors/:id
 * @access Private (Admin)
 */
router.delete("/:id", verifyTokenAndAdmin, deleteAuthor);

module.exports = router;
