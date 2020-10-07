import { request } from "express";

var express = require("express");
var router = express.Router();
var multer = require("multer");
var EMailController = require("../controllers/Email/Email.controller");
var UserController = require("../controllers/User/user.controller");
var AuthController = require("../controllers/Admin/Auth.Controller");
const imageUploader = multer({ dest: "public/" }); // (**)
router.post(
  "/sendEmail",
  imageUploader.single("file"),
  UserController.UploadFile,
  EMailController.SendEmail
);
router.post("/login", AuthController.Login);

module.exports = router;
