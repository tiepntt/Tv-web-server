import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { BookService } from "../../CRUD/Book/book";
import { BookInputDto } from "../../dto/Book/book.dto";
import { Book } from "../../entity/Book/Book";
import { AddBySheet } from "../../service/google-api/addStudentBySheest";
import { BookId } from "../../service/Id/id";
import { HandelStatus } from "../HandelAction";

const Create = async (req, res) => {
  let book = req.body.book;
  if (!book) return HandelStatus(400);
  let bookInput = plainToClass(BookInputDto, book, {
    excludeExtraneousValues: true,
  });

  let result = await BookService.Create(bookInput);
  res.send(result);
};
const CreateBySheet = async (req, res) => {
  let BookRepo = getRepository(Book);

  let Id = BookId;
  let arr = await AddBySheet(BookId);
  var data = (arr.result as any).data;
  let result = { success: 0, fail: 0 };
  for (let index = 0; index < data.length; index++) {
    if (index > 0) {
      let item = data[index];
      if (index > 0) {
        let bookConfig = {
          idBook: item[0].trim(),
          name: item[1],
          price: item[2],
          amount: item[3],
        };
        let bookInput = plainToClass(BookInputDto, bookConfig);

        let r = await BookService.Create(bookInput);

        if (r.status == 200) {
          result.success++;
        } else {
          console.log(r, bookInput);

          result.fail++;
        }
      }
    }
  }
  return res.send(HandelStatus(200, null, result));
};
const GetAll = async (req, res) => {
  let skip = req.params.skip || 0;
  let take = req.params.take || 10;
  var result = await BookService.GetAll(take, skip);
  res.send(result);
};
const RemoveById = async (req, res) => {
  var idBook = req.params.idBook;
  if (!idBook) {
    res.send(HandelStatus(204));
  }
  var result = await BookService.DeleteByIdBook(idBook);
  res.send(result);
};
const GetById = async (req, res) => {
  var idBook = req.params.idBook;
  var result = await BookService.GetById(idBook);
  res.send(result);
};
const Update = async (req, res) => {
  let book = req.body.book;
  if (!book) return res.send(HandelStatus(400));
  let bookInput = plainToClass(BookInputDto, book, {
    excludeExtraneousValues: true,
  });
  let result = await BookService.Update(bookInput);
  res.send(result);
};

export const BookController = {
  Create,
  CreateBySheet,
  RemoveById,
  GetAll,
  GetById,
  Update,
};
