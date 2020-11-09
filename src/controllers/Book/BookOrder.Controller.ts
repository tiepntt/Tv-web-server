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

  let arr = await AddBySheet(Id);
  let data = (arr.result as any).data;
  let result = { success: 0, fail: 0 };
  for (let index = 0; index < data.length; index++) {
    if (index > 0) {
      let item = data[index];
      let bookConfig = {
        IdStudent: item[0],
        BorrowDate: new Date(genBorn(item[2])),
        idBookdetail: item[1],
        userCheckIn: res.locals.userId,
      };
      let input = plainToClass(BookOrderCreateDto, bookConfig, {
        excludeExtraneousValues: true,
      });
      let r = await BookOrderService.Create(input);
      if (r.status == 200) {
        result.success++;
      } else {
        result.fail++;
      }
    }
  }
  res.send(HandelStatus(200, null, result));
};
const PayBySheets = async (req, res) => {
  if (!req.body.url) {
    res.send(HandelStatus(204));
  }

  let Id = getID(req.body.url);

  let arr = await AddBySheet(Id);
  let data = (arr.result as any).data;

  let result = { success: 0, fail: 0 };
  for (let index = 0; index < data.length; index++) {
    if (index > 0) {
      let item = data[index];
      let input = new BookOrderPayDto();
      input.idBookDetail = item[1];
      input.userCheckOutId = res.locals.userId;
      input.payDate = item[3] || new Date();
      let r = await BookOrderService.PayBook(input);
      if (r.status == 200) {
        result.success++;
      } else {
        result.fail++;
      }
    }
  }
  res.send(HandelStatus(200, null, result));
};
const Create = async (req, res) => {
  let BookOrder = req.body.bookOrder;
  if (!BookOrder) return HandelStatus(204);
  let input = plainToClass(BookOrderCreateDto, BookOrder, {
    excludeExtraneousValues: true,
  });
  input.borrowDate = BookOrder.borrowDate || new Date();
  input.userCheckInId = res.locals.userId;

  let result = await BookOrderService.Create(input);
  return res.send(result);
};
const Paid = async (req, res) => {
  let bookDetail = req.body.bookOrder;
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
