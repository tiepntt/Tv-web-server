var express = require("express");
var router = express.Router();
// var multer = require("multer");
// const imageUploader = multer({ dest: "public/" }); // (**)
var UserController = require("../controllers/User/user.controller");
var uploadMulter = require("../upload/cloudinary");
router.get("/", UserController.getAll);
router.post(
  "/create",
  uploadMulter.single("avatar"),
  UserController.UploadFile,
  UserController.create
);
// router.get("/:id", UserController.getById);
// router.delete("/:id", UserController.getById);
// router.put(
//   "/changeAvartar",
//   imageUploader.single("avatar"),
//   UserController.UploadFile
// );

router.post("/upload", uploadMulter.single("photo"), (req, res) => {
  res.send(req.file);
});

module.exports = router;
