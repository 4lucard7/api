const express = require("express");
const router = express.Router();

const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/VerifyToken");

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");

/**
 * @description Get all users
 * @route GET /api/users
 * @access Private (Admin)
 */
router.get("/", verifyTokenAndAdmin, getAllUsers);

/**
 * @description Get user by ID
 * @route GET /api/users/:id
 * @access Private
 */
router.get("/:id", verifyTokenAndAuthorization, getUserById);

/**
 * @description Update user
 * @route PUT /api/users/:id
 * @access Private
 */
router.put("/:id", verifyTokenAndAuthorization, updateUser);

/**
 * @description Delete user
 * @route DELETE /api/users/:id
 * @access Private
 */
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

module.exports = router;
