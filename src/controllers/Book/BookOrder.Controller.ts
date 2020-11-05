import { plainToClass } from "class-transformer";
import { ETIMEDOUT } from "constants";
import { BookOrderService } from "../../CRUD/Book/BookOder";
import {
  BookOrderCreateDto,
  BookOrderPayDto,
} from "../../dto/Book/bookOrder.dto";
import { genBorn } from "../../libs/Book";
import { getID } from "../../libs/Sheet";
import { AddBySheet } from "../../service/google-api/addStudentBySheest";
import { HandelStatus } from "../HandelAction";

const CreateBySheet = async (req, res) => {
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
        IdStudent: item[0],
        BorrowDate: new Date(genBorn(item[2])),
        idBookdetail: item[1],
        userCheckIn: res.locals.userId,
      };
      let input = plainToClass(BookOrderCreateDto, bookConfig, {
        excludeExtraneousValues: true,
      });
      var result = await BookOrderService.Create(input);
    }
  });
  res.send(HandelStatus(200));
};
const PayBySheets = async (req, res) => {
  if (!req.body.url) {
    res.send(HandelStatus(204));
  }

  let Id = getID(req.body.url);
  console.log(Id);

  let arr = await AddBySheet(Id);
  var data = (arr.result as any).data;
  await (data as any).forEach(async (item, index) => {
    if (index > 0) {
      let input = new BookOrderPayDto();
      input.idBookDetail = item[1];
      input.userCheckOutId = res.locals.userId;
      input.payDate = item[3] || new Date();
      var result = await BookOrderService.PayBook(input);
    }
  });
  res.send(HandelStatus(200));
};
const Create = async (req, res) => {
  var BookOrder = req.body.bookOrder;
  if (!BookOrder) return HandelStatus(204);
  let input = plainToClass(BookOrderCreateDto, BookOrder, {
    excludeExtraneousValues: true,
  });
  input.borrowDate = BookOrder.borrowDate || new Date();
  input.userCheckInId = res.locals.userId;

  var result = await BookOrderService.Create(input);
  return res.send(result);
};
const Paid = async (req, res) => {
  var bookDetail = req.body.bookOrder;
  if (!bookDetail) return res.send(HandelStatus(400));
  let bookOrder = plainToClass(BookOrderPayDto, bookDetail, {
    excludeExtraneousValues: true,
  });
  bookOrder.userCheckOutId = res.locals.userId;
  bookOrder.payDate = bookOrder.payDate || new Date();
  let result = await BookOrderService.PayBook(bookOrder);
  res.send(result);
};
const getById = async (req, res) => {
  let id = req.params.id;
  if (!id) return HandelStatus(400);
  let result = await BookOrderService.getById(id);
  return res.send(result);
};
export const BookOrderController = {
  CreateBySheet,
  PayBySheets,
  Create,
  Paid,
  getById,
};
