var express = require("express");
var router = express.Router();
var multer = require("multer");
const imageUploader = multer({ dest: "public/" }); // (**)
var UserController = require("../controllers/User/user.controller");
router.get("/", UserController.getAll);
router.post(
  "/create",
  imageUploader.single("avatar"),
  UserController.UploadFile,
  UserController.create
);
router.get("/:id", UserController.getById);
router.delete("/:id", UserController.getById);
router.put(
  "/changeAvartar",
  imageUploader.single("avatar"),
  UserController.UploadFile
);

module.exports = router;
