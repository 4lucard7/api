const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

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


UserSchema.methods.generateToken = function () {
  return jwt.sign(
    {
      id: this._id,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "30d" }
  );
};


const User = mongoose.model("User", UserSchema);



// Update user
function ValidationUpdateUser(obj) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(100),
    email: Joi.string().email().min(5),
    password: Joi.string().min(6),
    isAdmin: Joi.boolean(),
  });

  return schema.validate(obj);
}

// Register
function validateRegister(obj) {
  const schema = Joi.object({
    username: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().min(5).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(obj);
}

// Login
function validateLogin(obj) {
  const schema = Joi.object({
    email: Joi.string().email().min(5).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(obj);
}

module.exports = {
  User,
  ValidationUpdateUser,
  validateRegister,
  validateLogin,
};
