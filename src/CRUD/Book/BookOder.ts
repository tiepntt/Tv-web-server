import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { mapObject } from "../../utils/map";
import { HandelStatus } from "../../controllers/HandelAction";
import {
  BookOrderCreateDto,
  BookOrderGetDto,
  BookOrderInfoDto,
  BookOrderPayDto,
} from "../../dto/Book/bookOrder.dto";
import { BookDetail } from "../../entity/Book/BookDetails";
import { BookOrder } from "../../entity/Book/BookOrder";
import { Student } from "../../entity/Student/Student";
import { User } from "../../entity/User/User";

const Create = async (bookOrderConfig: BookOrderCreateDto) => {
  console.log(bookOrderConfig);

  let BookOrderRepo = getRepository(BookOrder);
  let UserRepo = getRepository(User);
  let BookDetailRepo = getRepository(BookDetail);
  let StudentRepo = getRepository(Student);
  if (
    !bookOrderConfig.idBookdetail ||
    !bookOrderConfig.idStudent ||
    !bookOrderConfig.userCheckInId
  )
    return HandelStatus(204);

  let user = await UserRepo.findOne(bookOrderConfig.userCheckInId);

  let bookdetail = await BookDetailRepo.findOne({
    idBookDetails: bookOrderConfig.idBookdetail,
  });
  let student = await StudentRepo.findOne({
    idStudent: bookOrderConfig.idStudent,
  });

  if (!user || !bookdetail || !student) {
    return HandelStatus(500);
  }

  let bookOrder = plainToClass(BookOrder, bookOrderConfig);
  bookOrder.student = student;
  bookOrder.userCheckIn = user;
  bookOrder.bookdetail = bookdetail;
  if (!bookOrder.deadline) bookOrder.deadline = new Date();

  bookOrder.deadline.setDate(bookOrder.borrowDate.getDate() + 180);
  try {
    await BookOrderRepo.save(bookOrder);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const RemoveById = async (Id) => {
  let BookOrderRepo = getRepository(BookOrder);
  let bookOrder = await BookOrderRepo.findOne(Id);
  if (!bookOrder) return HandelStatus(404);
  await BookOrderRepo.remove(bookOrder);
  return HandelStatus(200);
};
const PayBook = async (input: BookOrderPayDto) => {
  if (!input || !input.idBookDetail || !input.userCheckOutId)
    return HandelStatus(400);

  let BookOrderRepo = getRepository(BookOrder);
  let UserRepo = getRepository(User);
  let bookDetail = await getRepository(BookDetail).findOne({
    idBookDetails: input.idBookDetail,
  });
  let bookOrder = await BookOrderRepo.findOne({ bookdetail: bookDetail });
  let user = await UserRepo.findOne(input.userCheckOutId);
  if (!bookOrder || !user) return HandelStatus(404);
  bookOrder.userCheckOut = user;
  bookOrder = mapObject(bookOrder, input);
  try {
    await BookOrderRepo.update(bookOrder.id, bookOrder);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const GetBookOrderBorrowed = async (studentId: string) => {
  let BookOrderRepo = getRepository(BookOrder);
  let bookOrders = await BookOrderRepo.createQueryBuilder("bookOrder")
    .leftJoinAndSelect("bookOrder.student", "student")
    .leftJoinAndSelect("bookOrder.bookdetail", "bookdetail")
    .leftJoinAndSelect("bookdetail.book", "book")
    .leftJoinAndSelect("bookOrder.userCheckIn", "userCheckIn")
    .where("bookOrder.PayDate is NULL")
    .andWhere("student.idStudent = :id", { id: studentId })
    .orderBy({ "bookOrder.BorrowDate": "DESC" })
    .getMany();
  if (bookOrders.length == 0) return HandelStatus(404);
  try {
    let result = plainToClass(BookOrderGetDto, bookOrders, {
      excludeExtraneousValues: true,
    });

    return result;
  } catch (e) {
    return bookOrders;
  }
};
const GetBookOrderPaid = async (studentId) => {
  let BookOrderRepo = getRepository(BookOrder);
  let bookOrders = await BookOrderRepo.createQueryBuilder("bookOrder")
    .leftJoinAndSelect("bookOrder.student", "student")
    .leftJoinAndSelect("bookOrder.bookdetail", "bookdetail")
    .leftJoinAndSelect("bookdetail.book", "book")
    .leftJoinAndSelect("bookOrder.userCheckIn", "userCheckIn")
    .leftJoinAndSelect("bookOrder.userCheckIn", "userCheckOut")
    .where("bookOrder.PayDate is not NULL")
    .andWhere("student.idStudent = :id", { id: studentId })
    .orderBy({ "bookOrder.BorrowDate": "DESC" })
    .getMany();
  try {
    let result = plainToClass(BookOrderGetDto, bookOrders, {
      excludeExtraneousValues: true,
    });

    return result;
  } catch (e) {
    return bookOrders;
  }
};
const getById = async (id: number) => {
  let BookOrderRepo = getRepository(BookOrder);
  let bookOrder = await BookOrderRepo.createQueryBuilder("bookOrder")
    .leftJoinAndSelect("bookOrder.student", "student")
    .leftJoinAndSelect("bookOrder.bookdetail", "bookdetail")
    .leftJoinAndSelect("bookdetail.book", "book")
    .leftJoinAndSelect("bookOrder.userCheckIn", "userCheckIn")
    .leftJoinAndSelect("bookOrder.userCheckOut", "userCheckOut")
    .where("bookOrder.id=:id", { id: id })
    .getOne();

  try {
    let result = plainToClass(BookOrderInfoDto, bookOrder, {
      excludeExtraneousValues: true,
    });
    return HandelStatus(200, null, result);
  } catch (e) {
    return HandelStatus(500);
  }
};
export const BookOrderService = {
  Create,
  RemoveById,
  PayBook,
  GetBookOrderBorrowed,
  GetBookOrderPaid,
  getById,
};
