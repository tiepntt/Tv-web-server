import {
  CheckIsCreateOrEditBook,
  CheckIsCreateOrEditSheet,
} from "../controllers/Admin/Auth.Controller";
import { BookController } from "../controllers/Book/Book.Controller";
import { BookDetailController } from "../controllers/Book/BookDetail.Controller";
import { BookOrderController } from "../controllers/Book/BookOrder.Controller";

let express = require("express");
let router = express.Router();
//book
router.post("/create", CheckIsCreateOrEditBook, BookController.Create);
router.get("/skip=:skip&take=:take", BookController.GetAll);
router.put("/", CheckIsCreateOrEditBook, BookController.Update);
router.get("/:IdBook", BookController.GetById);
router.delete(
  "/RemoveById/idBook=:idBook",
  CheckIsCreateOrEditBook,
  BookController.RemoveById
);
router.post(
  "/CreateBySheet",
  CheckIsCreateOrEditSheet,
  BookController.CreateBySheet
);

//bookDetails
router.post(
  "/bookDetail/CreateBySheet",
  CheckIsCreateOrEditSheet,
  BookDetailController.CreateBySheet
);
router.post("/bookDetail/create", BookDetailController.Create);

router.get("/bookDetail/:IdBook", BookDetailController.GetById);
router.get("/bookDetail/getById/:Id", BookDetailController.GetById);
router.delete(
  "/bookDetail/:id",
  CheckIsCreateOrEditBook,
  BookDetailController.removeById
);

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
router.post(
  "/bookOrder/create",
  CheckIsCreateOrEditBook,
  BookOrderController.Create
);
router.post(
  "/bookOrder/pay",
  CheckIsCreateOrEditBook,
  BookOrderController.Paid
);
router.get(
  "/bookOrder/history/take=:take&skip=:skip",
  BookOrderController.getBookOrderHistory
);
router.get(
  "/bookOrder/historyCount/dayLeft=:dayLeft",
  BookOrderController.getBookOrderHistoryCount
);
router.get("/bookOrder/:id", BookOrderController.getById);
module.exports = router;
