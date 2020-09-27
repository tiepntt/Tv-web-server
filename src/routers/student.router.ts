var express = require("express");
var router = express.Router();
var StudentController = require("../controllers/Student/Student.controller");
router.post("/createBySheet", StudentController.CreateBySheets);
router.post("/addToSheet", StudentController.AddToSheet);
router.post("/pushBySheet", StudentController.PushToSheets);
router.get("/Search/Book/:id", StudentController.GetBookBorrowed);

module.exports = router;
