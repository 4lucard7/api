const mongoose = require("mongoose");
const Joi = require("joi");


const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);


// Validation for creating a new user
function ValidationCreateUser(obj) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().min(5).required(),
    password: Joi.string().min(6).required(),
    isAdmin: Joi.boolean(),
  });

  return schema.validate(obj);
}

// Validation for updating a user (all fields optional)
function ValidationUpdateUser(obj) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(100),
    email: Joi.string().email().min(5),
    password: Joi.string().min(6),
    isAdmin: Joi.boolean(),
  });

  return schema.validate(obj);
}

// Validation for user registration
function validateRegister(obj) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().min(5).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(obj);
}

// Validation for user login
function validateLogin(obj) {
  const schema = Joi.object({
    email: Joi.string().email().min(5).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(obj);
}

module.exports = {
  User,
  ValidationCreateUser,
  ValidationUpdateUser,
  validateRegister,
  validateLogin
};
