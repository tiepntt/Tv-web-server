import { request } from "express";
import { CheckIsSendEmail, CheckToken, Logout } from "../controllers/Admin/Auth.Controller";
import { HandelStatus } from "../controllers/HandelAction";

var express = require("express");
var router = express.Router();
var multer = require("multer");
var EMailController = require("../controllers/Email/Email.controller");
var UserController = require("../controllers/User/user.controller");
var AuthController = require("../controllers/Admin/Auth.Controller");
const imageUploader = multer({ dest: "public/" }); // (**)
router.post(
  "/sendEmail",
  CheckToken,
  CheckIsSendEmail,
  imageUploader.single("file"),
  UserController.UploadFile,
  EMailController.SendEmail
);
router.post( "/login", AuthController.Login );
router.post( "/logout", Logout );
router.post( "/checkLogin",CheckToken, ( req, res ) =>
{
  req.send(HandelStatus(200)) 
});

module.exports = router;
