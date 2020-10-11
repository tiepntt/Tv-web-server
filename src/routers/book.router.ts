import { CheckIsCreateOrEditBook, CheckIsCreateOrEditSheet, CheckToken } from "../controllers/Admin/Auth.Controller";

var express = require("express");
var router = express.Router();
var BookController = require("../controllers/Book/Book.Controller");
var BookDetailsController = require("../controllers/Book/BookDetail.Controller");
var BookOrderController = require("../controllers/Book/BookOrder.Controller");
//book
router.post("/create",CheckIsCreateOrEditBook, BookController.Create);
router.get("/", BookController.GetAll);
router.put("/",CheckIsCreateOrEditBook, BookController.Update);
router.get("/:IdBook", BookController.GetById);
router.delete("/RemoveById",CheckIsCreateOrEditBook, BookController.RemoveById);
router.post("/CreateBySheet",CheckIsCreateOrEditSheet, BookController.CreateBySheet);


//bookDetails
router.post(
  "/bookDetail/CreateBySheet",
  CheckIsCreateOrEditSheet,
  BookDetailsController.CreateBySheet
);

router.get("/bookDetail/:IdBook", BookDetailsController.GetAll);
router.get(
  "/bookDetail/getById/:Id",
  BookDetailsController.GetById
);
router.delete("/bookDetail/:id",CheckIsCreateOrEditBook, BookDetailsController.removeById)


//BookOrder
router.post(
  "/bookOrder/CreateBySheet",
  CheckIsCreateOrEditSheet,
  BookOrderController.CreateBySheet
);
router.post(
  "/bookOrder/PayBySheet",
  CheckIsCreateOrEditSheet,
  BookOrderController.PayBySheets
);
router.post("/bookOrder/create",CheckIsCreateOrEditBook, BookOrderController.Create);
router.post("/bookOrder/pay",CheckIsCreateOrEditBook, BookOrderController.Paid )
module.exports = router;
