import { books } from "googleapis/build/src/apis/books";
import { getRepository } from "typeorm";
import {
  Create,
  DeleteByIdBook,
  GetAll,
  GetById,
  Update,
} from "../../CRUD/Book/book";
import { Book } from "../../entity/Book/Book";
import { AddBySheet } from "../../service/google-api/addStudentBySheest";
import { BookId } from "../../service/Id/id";
import { HandelStatus } from "../HandelAction";

module.exports.Create = async (req, res) => {
  if (!req.body.book) {
    res.send(HandelStatus(404));
    return;
  }
  let result = await Create(req.body.book);
  res.send(result);
};
module.exports.CreateBySheet = async (req, res) => {
  let BookRepo = getRepository(Book);

  let Id = BookId;
  let arr = await AddBySheet(BookId);
  var data = (arr.result as any).data;
  await (data as any).forEach(async (item, index) => {
    if (index > 0) {
      let book = await BookRepo.findOne({ idBook: item[0] });
      let bookConfig = {
        id: item[0],
        name: item[1],
        price: item[2],
        amoun: item[3],
      };
      if (book) {
        await Update(bookConfig);
      } else {
        await Create(bookConfig);
      }
    }
  });
  res.send(HandelStatus(200));
};
module.exports.GetAll = async (req, res) => {
  var result = await GetAll();
  res.send(result);
};
module.exports.RemoveById = async (req, res) => {
  var idBook = req.body.idBook;
  if (!idBook) {
    res.send(HandelStatus(204));
  }
  var result = await DeleteByIdBook(idBook);
  res.send(result);
};
module.exports.GetById = async (req, res) => {
  var idBook = req.params.IdBook;
  var result = await GetById(idBook);
  res.send(result);
};
module.exports.Update = async (req, res) => {
  if (!req.body.book) {
    res.send(HandelStatus(404));
    return;
  }
  let result = await Update(req.body.book);
  res.send(result);
};
