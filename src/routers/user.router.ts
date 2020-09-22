var express = require("express");
var router = express.Router();
var UserController = require("../controllers/User/user.controller");
router.get("/", UserController.getAll);
router.post("/create", UserController.create);
router.get("/:id", UserController.getById);
router.delete("/:id", UserController.getById);

module.exports = router;
