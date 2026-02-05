const mongoose = require("mongoose");
const Joi = require("joi");



const AuthorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    country: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    birthYear: {
      type: Number,
      required: true,
      min: 0,
      max: new Date().getFullYear(),
    },
  },
  { timestamps: true }
);


// Validation for creating a new author
function ValidationCreateAuthor(obj) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    country: Joi.string().min(2).max(100).required(),
    birthYear: Joi.number().integer().min(0).max(new Date().getFullYear()).required(),
  });

  return schema.validate(obj);
}

// Validation for updating an author (all fields optional)
function ValidationUpdateAuthor(obj) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100),
    country: Joi.string().min(2).max(100),
    birthYear: Joi.number().integer().min(0).max(new Date().getFullYear()),
  });

  return schema.validate(obj);
}



const Author = mongoose.model("Author", AuthorSchema);

module.exports = {
  Author,
  ValidationCreateAuthor,
  ValidationUpdateAuthor,
};
