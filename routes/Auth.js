const express = require("express");
const Router = express.Router();
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const { User, validateRegister, validateLogin } = require("../models/User");

/**
 * @description Register new user
 * @route /api/auth/register
 * @method POST
 * @access public
 */
Router.post("/register", asyncHandler(async (req, res) => {

  const { error } = validateRegister(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "User already registered" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  const savedUser = await user.save();
  const token = user.generateToken();

  const { password, ...other } = savedUser._doc;

  res.status(201).json({ ...other, token });
}));

/**
 * @description Login user
 * @route /api/auth/login
 * @method POST
 * @access public
 */
Router.post("/login", asyncHandler(async (req, res) => {

  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = user.generateToken();
  const { password, ...other } = user._doc;

  res.status(200).json({ ...other, token });
}));

module.exports = Router;
