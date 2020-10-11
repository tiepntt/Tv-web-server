import {  CheckIsCreateOrEditUser, CheckToken } from "../controllers/Admin/Auth.Controller";
import { GetAllDepartment } from "../controllers/User/department.controller";
import { getAllRoles } from "../controllers/User/role.controller";
import { create, deleteById, getById, update, updateRole } from "../controllers/User/user.controller";
import { uploadMulter } from "../upload/cloudinary";

var express = require("express");
var router = express.Router();
var UserController = require("../controllers/User/user.controller");
router.get( "/", UserController.getAll );
router.get("/role", getAllRoles)
//update role
//create role
//delete role

router.get("/department", GetAllDepartment )
router.post(
  "/create",
  CheckToken,
  CheckIsCreateOrEditUser,
  uploadMulter.single("avatar"),
  create
);
router.get("/:id", getById);
router.delete("/:id", CheckIsCreateOrEditUser, deleteById);
router.put( "/",uploadMulter.single("photo"), update );
router.put("/updateRole",  CheckIsCreateOrEditUser, updateRole);
router.post("/upload", uploadMulter.single("photo"), (req, res) => {
  res.send(req.file);
} );
//get role


module.exports = router;
