const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt  = require("bcrypt");
const nodemaielr = require("nodemailer");


/**
 * @description Get Forgot Password view
 * @route GET /password/forgot-password
 * @access Public
 */
module.exports.getForgotPasswordView = asyncHandler( (req, res) => {
    res.render("forgot-password");
})

/**
 * @description send Forgot Password Link
 * @route Post /password/forgot-password
 * @access Public
 */
module.exports.sendForgotPasswordLink = asyncHandler( async (req, res) => {
    
    const user = await User.findOne({email : req.body.email});
    if(!user){
        return res.status(404).json({message : "user not found"});
    }
    const secret = process.env.JWT_SECRET_KEY + user.password;
    const token = jwt.sign({email : user.email, id : user.id}, secret, {
        expiresIn : "10m",
    });

    const link = `http://localhost:3000/password/reset-password/${user._id}/${token}`;

    //Send Email to user
    

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass : process.env.USER_PASS
  }
});

const mailOption = {
  from: process.env.EMAIL_USER,
  to: user.email,
  subject: "Reset Password",
  html: `
    <div style="font-family: Arial; padding: 10px">
      <h3>Password Reset</h3>
      <p>Click on the link below to reset your password:</p>
      <a 
        href="${link}" 
        style="
          display:inline-block;
          padding:10px 15px;
          background:#2563eb;
          color:#fff;
          text-decoration:none;
          border-radius:5px;
        "
      >
        Reset Password
      </a>
      <p style="margin-top:10px; font-size:12px;">
        This link will expire soon.
      </p>
    </div>
  `
};

try {
  await transporter.sendMail(mailOption);
  console.log("Reset email sent successfully");
  res.render("link-send");
} catch (error) {
  console.error("Email error:", error);
  res.status(500).json({ message: "Failed to send reset email" });
}

})

/**
 * @description get reset Password Link
 * @route get /password/forgot-password/:userId/token
 * @access Public
 */
module.exports.getResetPasswordView = asyncHandler( async (req, res) => {
    
    const user = await User.findById(req.params.userId);
    if(!user){
        return res.status(404).json({message : "user not found"});
    }
    const secret = process.env.JWT_SECRET_KEY + user.password;
   try {
    jwt.verify(req.params.token, secret);
    res.render("reset-password", {email: user.email, userId: req.params.userId, token: req.params.token})
   } catch (error) {
    console.log(error);
    res.json("error ")
   }
})

/**
 * @description reset Password the password
 * @route Post /password/forgot-password/:userId/:token
 */
module.exports.resetPassword = asyncHandler( async (req, res) => {
    
    const user = await User.findById(req.params.userId);
    if(!user){
        return res.status(404).json({message : "user not found"});
    }
    const secret = process.env.JWT_SECRET_KEY + user.password;
   try {
    jwt.verify(req.params.token, secret);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;

    await user.save();
    res.render("success-password");
   } catch (error) {
    console.log(error);
    return res.status(400).json({message : "Invalid or expired reset link"});
   }
})