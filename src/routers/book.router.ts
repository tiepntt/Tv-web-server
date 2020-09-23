var express = require("express");
var router = express.Router();
var BookController = require("../controllers/Book/Book.Controller");
var BookDetailsController = require('../controllers/Book/BookDetail.Controller')
var BookOrderController = require('../controllers/Book/BookOrder.Controller')

router.post("/create", BookController.Create);
router.post("/CreateBySheet", BookController.CreateBySheet);
router.post("/bookDetail/CreateBySheet", BookDetailsController.CreateBySheet);
router.post("/bookOrder/CreateBySheet", BookOrderController.CreateBySheet);


module.exports = router;