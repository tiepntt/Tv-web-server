import { CheckToken } from "../controllers/Admin/Auth.Controller";

var express = require("express");
var router = express.Router();
var StudentController = require("../controllers/Student/Student.controller");
router.post("/createBySheet", CheckToken, StudentController.CreateBySheets);
router.post("/addToSheet", CheckToken, StudentController.AddToSheet);
router.post("/pushBySheet", CheckToken, StudentController.PushToSheets);
router.get("/Search/Book/:id", StudentController.GetBookBorrowed);

module.exports = router;
