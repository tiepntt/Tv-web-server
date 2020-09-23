var express = require("express");
var router = express.Router();
var StudentController = require("../controllers/Student/Student.controller");
router.post("/createBySheet", StudentController.CreateBySheets);
router.post("/pushBySheet", StudentController.PushToSheets);

module.exports = router;
