import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { BookDetailService } from "../../CRUD/Book/bookDetails";
import { BookDetailInputDto } from "../../dto/Book/book.detail.dto";

import { BookDetail } from "../../entity/Book/BookDetails";
import { getIdBook } from "../../libs/Book";
import { AddBySheet } from "../../service/google-api/addStudentBySheest";
import { BookCopyId, BookId } from "../../service/Id/id";
import { HandelStatus } from "../HandelAction";

const Create = async (req, res) => {
  let bookDetails = req.body.bookdetail;
  if (!bookDetails) return res.send(HandelStatus(400));
  let bookDetailInput = plainToClass(BookDetailInputDto, bookDetails, {
    excludeExtraneousValues: true,
  });
  let result = await BookDetailService.Create(bookDetailInput);
  res.send(result);
};
const CreateBySheet = async (req, res) => {
  let BookDetailsRepo = getRepository(BookDetail);

  let Id = BookCopyId;
  let arr = await AddBySheet(Id);
  var data = (arr.result as any).data;
  await (data as any).forEach(async (item, index) => {
    if (index > 0) {
      let book = await BookDetailsRepo.findOne({ idBookDetails: item[0] });
      let bookConfig = {
        idBookDetails: item[0],
        idBook: getIdBook(item[0]),
      };
      let bookdetail = plainToClass(BookDetailInputDto, bookConfig, {
        excludeExtraneousValues: true,
      });
      if (book) {
        await BookDetailService.Update(bookdetail);
      } else {
        await BookDetailService.Create(bookdetail);
      }
    }
  });
  res.send(HandelStatus(200));
};
const GetAll = async (req, res) => {
  var IdBook = req.params.IdBook;
  var result = await BookDetailService.GetAll(IdBook);
  res.send(result);
};
const GetById = async (req, res) => {
  var idBookDetails = req.params.IdBook;

  var result = await BookDetailService.GetById(idBookDetails);
  res.send(result);
};
const removeById = async (req, res) => {
  var idBookDetails = req.params.id;
  var result = await BookDetailService.RemoveById(idBookDetails);
  res.send(result);
};
export const BookDetailController = {
  Create,
  CreateBySheet,
  GetAll,
  GetById,
  removeById,
};
