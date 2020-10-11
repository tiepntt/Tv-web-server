import { Create, PayBook } from "../../CRUD/Book/BookOder";

import { genBorn } from "../../libs/Book";
import { getID } from "../../libs/Sheet";
import { AddBySheet } from "../../service/google-api/addStudentBySheest";
import { HandelStatus } from "../HandelAction";

module.exports.CreateBySheet = async (req, res) => {
  if (!req.body.url) {
    res.send(HandelStatus(204));
  }

  let Id = getID(req.body.url);
  console.log(Id);

  let arr = await AddBySheet(Id);
  var data = (arr.result as any).data;
  await (data as any).forEach(async (item, index) => {
    if (index > 0) {
      let bookConfig = {
        studentId: item[0],
        BorrowDate: genBorn(item[2]),
        bookdetailId: item[1],
        userId1: res.locals.userId,
      };

      var result = await Create(bookConfig);
    }
  });
  res.send(HandelStatus(200));
};
module.exports.PayBySheets = async (req, res) => {
  if (!req.body.url) {
    res.send(HandelStatus(204));
  }

  let Id = getID(req.body.url);
  console.log(Id);

  let arr = await AddBySheet(Id);
  var data = (arr.result as any).data;
  await (data as any).forEach(async (item, index) => {
    if (index > 0) {
      var result = await PayBook(item[1], item[3], item[2]);
    }
  });
  res.send(HandelStatus(200));
};
module.exports.Create = async (req, res) => {
  var BookOrder = req.body.bookOrder;
  if (!BookOrder) return HandelStatus(204);
  var result = await Create(BookOrder);
  res.send(result);
};
module.exports.Paid = async (req, res) => {
  var bookDetailId = req.body.bookDetailId;
  var UserId = res.locals.userId;
  let result = await PayBook(bookDetailId, UserId);
  res.send(result);
};
