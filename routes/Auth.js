const express = require("express");
const Router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const {User, validateRegister, validateLogin} = require("../models/User");


/**
 * @description Register new user
 * @route /api/auth/register
 * @method Post
 * @access public
 */
Router.post("/register", asyncHandler(async (req, res) => {

    const {error} =  validateRegister(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message});
    }

    let user = await User.findOne({email : req.body.email});
    if(user){
        return res.status(400).json({message : "this user already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    user = new User({
      email : req.body.email,
      username : req.body.username,
      password : req.body.password,
    })
    const rest = await user.save();
    const token = jwt.sign({ id : user._id, isAdmin : user.isAdmin }, process.env.JWT_SECRET_KEY); 
    const {password, ...other} = rest._doc;

    res.status(201).json({...other, token});
  })
);

/**
 * @description Login user
 * @route /api/auth/login
 * @method Post
 * @access public
 */
Router.post("/register", asyncHandler(async (req, res) => {

    const {error} =  validateLogin(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message});
    }

    let user = await User.findOne({email : req.body.email});

    if(!user){
        return res.status(400).json({message : "invalid email" });
    }

    const isPassword = await bcrypt.compare(req.body.password, user.password);
    
    if(!isPassword){
        return res.status(400).json({message : "invalid password" });
    }

    const token = jwt.sign({ id : user._id, isAdmin : user.isAdmin }, process.env.JWT_SECRET_KEY);
    const {password, ...other} = user._doc;
    
    res.status(200).json({...other, token});
  })
);

module.exports = Router;