const express = require("express");
const Router = express.Router();
const asyncHandler = require("express-async-handler");
const {Author , ValidationUpdateAuthor, ValidationCreateAuthor} = require("../models/Author");
const {
  verifyTokenAndAdmin
} = require("../middlewares/VerifyToken");


/**
 * @description Get all authors
 * @route /api/authors
 * @method GET
 * @access public
 */
Router.get("/", asyncHandler(async (req, res) => {

    const authors = await Author.find();

    if (authors.length === 0) {
      return res.status(404).json({ message: "No authors found" });
    }

    res.status(200).json(authors);
  })
);

/**
 * @description Get  author byId
 * @route /api/authors/:id
 * @method GET
 * @access public
 */
Router.get("/:id", asyncHandler(async (req, res) => {
    
    const author = await Author.findById(req.params.id);

    if (!author) {
      return res.status(404).json({ message: "No author found" });
    }

    res.status(200).json(author);
  })
);

/**
 * @description create new  author 
 * @route /api/authors
 * @method POST
 * @access private
 */
Router.post("/", verifyTokenAndAdmin, asyncHandler(async (req, res) => {
    
    const {error} = ValidationCreateAuthor(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message});
    }

    const author = new Author({
        name : req.body.name,
        country : req.body.country,
        birthYear : req.body.birthYear
    })

    const rest = await author.save();
    res.status(201).json(rest);
  })
);

/**
 * @description Update  author 
 * @route /api/authors
 * @method PUT
 * @access public
 */
Router.put("/", verifyTokenAndAdmin, asyncHandler(async (req, res) => {
    
    const {error} = ValidationUpdateAuthor(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message});
    }

    const rest = await Author.findByIdAndUpdate(req.params.id,{
        $set : {
            name : req.body.name,
            country : req.body.country,
            birthYear : req.body.birthYear
        }
    }

    );
    res.status(201).json(rest);
  })
);

/**
 * @description delete author 
 * @route /api/authors/:id
 * @method DELETE
 * @access public
 */
Router.delete("/:id", verifyTokenAndAdmin, asyncHandler(async (req, res) => {
    const author = await Author.findByIdAndDelete(req.params.id);

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.status(200).json({ message: "Author has been deleted" });
  })
);

module.exports = Router;

