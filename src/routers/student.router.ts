var express = require("express");
var router = express.Router();
var StudentController = require("../controllers/Student/Student.controller");
router.post("/createBySheet", StudentController.CreateBySheets);

module.exports = router;
