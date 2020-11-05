import {
  CheckIsCreateOrEditSheet,
  CheckIsCreateOrEditUser,
  CheckToken,
} from "../controllers/Admin/Auth.Controller";
import { StudentController } from "../controllers/Student/Student.controller";

var express = require("express");
var router = express.Router();
router.post(
  "/createBySheet",
  CheckToken,
  CheckIsCreateOrEditSheet,
  StudentController.CreateBySheets
);
router.post(
  "/addToSheet",
  CheckToken,
  CheckIsCreateOrEditSheet,
  StudentController.AddToSheet
);
router.post(
  "/pushBySheet",
  CheckToken,
  CheckIsCreateOrEditSheet,
  StudentController.PushToSheets
);
router.get("/Search/Book/:id", StudentController.GetBookBorrowed);
//create student
router.post(
  "/create",
  CheckToken,
  CheckIsCreateOrEditUser,
  StudentController.create
);
router.put(
  "/update",
  CheckToken,
  CheckIsCreateOrEditUser,
  StudentController.update
);
router.delete(
  "/:id",
  CheckToken,
  CheckIsCreateOrEditUser,
  StudentController.remove
);
router.get("/:id", CheckToken, StudentController.getById);

module.exports = router;
