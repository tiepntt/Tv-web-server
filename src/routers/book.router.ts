var express = require("express");
var router = express.Router();
var BookController = require("../controllers/Book/Book.Controller");

router.post("/create", BookController.Create);


module.exports = router;