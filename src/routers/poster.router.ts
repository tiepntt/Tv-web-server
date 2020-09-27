var express = require("express");
var router = express.Router();
var PosterController = require("../controllers/Poster/Poster.controller");
router.post("/create", PosterController.Create);

module.exports = router;
