import { CheckToken } from "../controllers/Admin/Auth.Controller";

var express = require("express");
var router = express.Router();
var BookController = require("../controllers/Book/Book.Controller");
var BookDetailsController = require("../controllers/Book/BookDetail.Controller");
var BookOrderController = require("../controllers/Book/BookOrder.Controller");

router.post("/create", CheckToken, BookController.Create);
router.get("/", CheckToken, BookController.GetAll);
router.put("/", CheckToken, BookController.Update);
router.get("/:IdBook", CheckToken, BookController.GetById);
router.delete("/RemoveById", CheckToken, BookController.RemoveById);
router.post("/CreateBySheet", CheckToken, BookController.CreateBySheet);

router.post(
  "/bookDetail/CreateBySheet",
  CheckToken,
  BookDetailsController.CreateBySheet
);
router.get("/bookDetail/:IdBook", CheckToken, BookDetailsController.GetAll);
router.get(
  "/bookDetail/getById/:Id",
  CheckToken,
  BookDetailsController.GetById
);

router.post(
  "/bookOrder/CreateBySheet",
  CheckToken,
  BookOrderController.CreateBySheet
);
router.post(
  "/bookOrder/PayBySheet",
  CheckToken,
  BookOrderController.PayBySheets
);
router.post("/bookOrder/create", CheckToken, BookOrderController.Create);

module.exports = router;
