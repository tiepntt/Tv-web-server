import { getRepository } from "typeorm";
import { Create, GetAll, GetById, RemoveById, Update } from "../../CRUD/Book/bookDetails";

import { BookDetail } from "../../entity/Book/BookDetails";
import { getIdBook } from "../../libs/Book";
import { AddBySheet } from "../../service/google-api/addStudentBySheest";
import { BookCopyId, BookId } from "../../service/Id/id";
import { HandelStatus } from "../HandelAction";

module.exports.Create = async (req, res) => {
  if (!req.body.BookDetail) {
    res.send(HandelStatus(404));
    return;
  }
  let result = await Create(req.body.BookDetail);
  res.send(result);
};
module.exports.CreateBySheet = async (req, res) => {
  let BookDetailsRepo = getRepository(BookDetail);

  let Id = BookCopyId;
  let arr = await AddBySheet(Id);
  var data = (arr.result as any).data;
  await (data as any).forEach(async (item, index) => {
    if (index > 0) {
      let book = await BookDetailsRepo.findOne({ idBookDetails: item[0] });
      let bookConfig = {
        id: item[0],
        bookid: getIdBook(item[0]),
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
  var IdBook = req.params.IdBook;
  var result = await GetAll(IdBook);
  res.send(result);
};
module.exports.GetById = async (req, res) => {
  var idBookDetails = req.params.Id;
  var result = await GetById(idBookDetails);
  res.send(result);
};
module.exports.removeById = async ( req, res ) =>
{
  var idBookDetails = req.params.id;
  var result = await RemoveById( idBookDetails );
  res.send( result );
};

