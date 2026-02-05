const joi = require("joi");
const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    publishedYear: {
      type: Number,
      required: true,
      min: 0,
      max: new Date().getFullYear(),
    },
    pages: {
      type: Number,
      required: true,
      min: 1,
      max: 5000,
    },
  },
  { timestamps: true }
);

// Validation Update
function ValidationCreateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    genre: Joi.string().min(3).max(100).required(),
    publishedYear: Joi.number()
      .integer()
      .min(0)
      .max(new Date().getFullYear())
      .required(),
    pages: Joi.number().integer().min(1).max(5000).required(),
    author: Joi.string().custom(objectId, "ObjectId Validation").required(),
  });

  return schema.validate(obj);
}

// Validation Update
function ValidationUpdateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100),
    genre: Joi.string().min(3).max(100),
    publishedYear: Joi.number()
      .integer()
      .min(0)
      .max(new Date().getFullYear()),
    pages: Joi.number().integer().min(1).max(5000),
    author: Joi.string().custom(objectId, "ObjectId Validation"),
  });

  return schema.validate(obj);
}

module.exports = {
  ValidationCreateBook,
  ValidationUpdateBook,
}

module.exports = mongoose.model("Book", BookSchema);
