const express = require("express");
const { date } = require("joi");
const router = express.Router();
const multer = require("multer");
const path = require("path");



const storage = multer.diskStorage({
    destination : (req, res, cb) => {
        cb(null, path.join(__dirname, "../images"));
    },
    filename : (req, file, cb) => {
        cb(null, new Date().toString().replace(/:/g, "-") + file.originalname);
    }
});

const upload = multer({storage});


router.post("/",upload.single("image"), (req, res) => {
    res.status(200).json({message : "image uploaded"});

})









module.exports = router;