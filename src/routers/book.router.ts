var express = require("express");
var router = express.Router();
var BookController = require("../controllers/Book/Book.Controller");
var BookDetailsController = require("../controllers/Book/BookDetail.Controller");
var BookOrderController = require("../controllers/Book/BookOrder.Controller");

router.post("/create", BookController.Create);
router.get("/", BookController.GetAll);
router.put("/", BookController.Update);
router.get("/:IdBook", BookController.GetById);
router.delete("/RemoveById", BookController.RemoveById);
router.post("/CreateBySheet", BookController.CreateBySheet);

router.post("/bookDetail/CreateBySheet", BookDetailsController.CreateBySheet);
router.get("/bookDetail/:IdBook", BookDetailsController.GetAll);
router.get("/bookDetail/getById/:Id", BookDetailsController.GetById);

router.post("/bookOrder/CreateBySheet", BookOrderController.CreateBySheet);
router.post("/bookOrder/PayBySheet", BookOrderController.PayBySheets);
router.post("/bookOrder/create", BookOrderController.Create);

module.exports = router;
