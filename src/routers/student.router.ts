import { CheckIsCreateOrEditSheet, CheckIsCreateOrEditUser, CheckToken } from "../controllers/Admin/Auth.Controller";
import { AddToSheet, create, CreateBySheets, GetBookBorrowed, getById, PushToSheets, remove, update } from "../controllers/Student/Student.controller";

var express = require("express");
var router = express.Router();
var StudentController = require("../controllers/Student/Student.controller");
router.post("/createBySheet", CheckToken, CheckIsCreateOrEditSheet, CreateBySheets);
router.post("/addToSheet", CheckToken,CheckIsCreateOrEditSheet, AddToSheet);
router.post("/pushBySheet", CheckToken,CheckIsCreateOrEditSheet, PushToSheets);
router.get( "/Search/Book/:id", GetBookBorrowed );
//create student
router.post( "/create", CheckToken, CheckIsCreateOrEditUser, create )
router.put( "/:id", CheckToken, CheckIsCreateOrEditUser, update )
router.delete( "/:id", CheckToken, CheckIsCreateOrEditUser, remove )
router.get("/:id", CheckToken, getById)


module.exports = router;
