var express = require("express");
var router = express.Router();
var PosterController = require("../controllers/Poster/Poster.controller");
var uploadMulter = require("../upload/cloudinary");
router.post("/create", uploadMulter.single("photo"), PosterController.Create);

module.exports = router;
