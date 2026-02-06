const express = require("express");
const Router = express.Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require("../middlewares/VerifyToken");

const { User, ValidationUpdateUser } = require("../models/User");

/**
 * @description Get all users
 * @route /api/users
 * @method GET
 * @access private (admin)
 */
Router.get("/", verifyTokenAndAdmin, asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");

  if (!users.length) {
    return res.status(404).json({ message: "No users found" });
  }

  res.status(200).json(users);
}));

/**
 * @description Get user by id
 * @route /api/users/:id
 * @method GET
 * @access private
 */
Router.get("/:id", verifyTokenAndAuthorization, asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
}));

/**
 * @description Update user
 * @route /api/users/:id
 * @method PUT
 * @access private
 */
Router.put("/:id", verifyTokenAndAuthorization, asyncHandler(async (req, res) => {

  const { error } = ValidationUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  ).select("-password");

  res.status(200).json(updatedUser);
}));

/**
 * @description Delete user
 * @route /api/users/:id
 * @method DELETE
 * @access private
 */
Router.delete("/:id", verifyTokenAndAuthorization, asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "User deleted successfully" });
}));

module.exports = Router;
