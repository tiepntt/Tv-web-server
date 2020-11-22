import {
  CheckIsCreateOrEditUser,
  CheckToken,
} from "../controllers/Admin/Auth.Controller";
import { GetAllDepartment } from "../controllers/User/department.controller";
import { getAllRoles } from "../controllers/User/role.controller";
import { UserController } from "../controllers/User/user.controller";
import { uploadMulter } from "../upload/cloudinary";

let express = require("express");
let router = express.Router();

router.get("/skip=:skip&take=:take", UserController.getAll);
router.get("/role", getAllRoles);
router.get("/department", GetAllDepartment);
router.post(
  "/create",
  CheckToken,
  CheckIsCreateOrEditUser,
  uploadMulter.single("avatar"),
  UserController.create
);
router.post(
  "/createBySheet",
  CheckToken,
  CheckIsCreateOrEditUser,
  UserController.CreateBySheets
);
router.get("/:id", UserController.getById);
router.delete("/:id", CheckIsCreateOrEditUser, UserController.deleteById);
router.put("/update", uploadMulter.single("avatar"), UserController.update);
router.put("/updateRole", CheckIsCreateOrEditUser, UserController.updateRole);
router.put("/block", CheckIsCreateOrEditUser, UserController.blockUser);
router.post("/upload", uploadMulter.single("photo"), (req, res) => {
  res.send(req.file);
});
//get role

module.exports = router;
