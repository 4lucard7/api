const express = require("express");
const Router = express.Router();

const { getForgotPasswordView, sendForgotPasswordLink, getResetPasswordView, resetPassword } = require("../controllers/passwordController");

// /password/forgot-password
Router.route("/forgot-password").get(getForgotPasswordView)
.post(sendForgotPasswordLink);

// /password/reset-password/:userId/:token
Router.route("/reset-password/:userId/:token").get(getResetPasswordView)
.post(resetPassword);

module.exports = Router;