const express = require("express");
const Router = express.Router();
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
 * @route /api/authors
 * @method GET
 * @access public
 */
Router.get("/", getAllAuthors);

/**
 * @description Get author by id
 * @route /api/authors/:id
 * @method GET
 * @access public
 */
Router.get("/:id", getAuthorById);

/**
 * @description Create new author
 * @route /api/authors
 * @method POST
 * @access private (admin)
 */
Router.post("/", verifyTokenAndAdmin, createAuthor);

/**
 * @description Update author
 * @route /api/authors/:id
 * @method PUT
 * @access private (admin)
 */
Router.put("/:id", verifyTokenAndAdmin, updateAuthor);

/**
 * @description Delete author
 * @route /api/authors/:id
 * @method DELETE
 * @access private (admin)
 */
Router.delete("/:id", verifyTokenAndAdmin, deleteAuthor);

module.exports = Router;
