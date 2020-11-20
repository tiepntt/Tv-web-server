import { plainToClass } from "class-transformer";
import { getRepository, IsNull, LessThanOrEqual, MoreThan, Not } from "typeorm";
import { mapObject } from "../../utils/map";
import { HandelStatus } from "../../controllers/HandelAction";
import {
  BookOrderCreateDto,
  BookOrderGetDto,
  BookOrderInfoDto,
  BookOrderList,
  BookOrderPayDto,
} from "../../dto/Book/bookOrder.dto";
import { BookDetail } from "../../entity/Book/BookDetails";
import { BookOrder } from "../../entity/Book/BookOrder";
import { Student } from "../../entity/Student/Student";
import { User } from "../../entity/User/User";
import { DateMap } from "../../libs/DateTime";
import { io } from "../..";
import { IoEmit } from "../../libs/constans";

const Create = async (bookOrderConfig: BookOrderCreateDto) => {

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
  let bookOrderGet = await BookOrderRepo.findOne({
    bookdetail: bookdetail,
    student: student,
    payDate: null,
  });
  if (bookOrderGet) return HandelStatus(302, "SV đã mượn cuốn sách này!");
  let bookOrder = plainToClass(BookOrder, bookOrderConfig);
  bookOrder.student = student;
  bookOrder.userCheckIn = user;
  bookOrder.bookdetail = bookdetail;
  if (!bookOrder.deadline) bookOrder.deadline = new Date();

  bookOrder.deadline.setDate(bookOrder.borrowDate.getDate() + 180);
  try {
    await BookOrderRepo.save(bookOrder);
    io.emit(IoEmit.NEW_ORDER);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const RemoveById = async (Id) => {
  let BookOrderRepo = getRepository(BookOrder);
  let bookOrder = await BookOrderRepo.findOne(Id);
  if (!bookOrder) return HandelStatus(404);
  try {
    await BookOrderRepo.remove(bookOrder);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(404);
  }
};
const PayBook = async (input: BookOrderPayDto) => {
  if (
    !input ||
    (!input.id && (!input.studentId || !input.idBookDetail)) ||
    !input.userCheckOutId
  )
    return HandelStatus(400);


  let BookOrderRepo = getRepository(BookOrder);
  let UserRepo = getRepository(User);
  let bookOrder;

  let student = await getRepository(Student).findOne({
    idStudent: input.studentId || "-1",
  });
  let bookdetail = await getRepository(BookDetail).findOne({
    idBookDetails: input.idBookDetail || "-1",
  });
  if (input.id) {
    bookOrder = await BookOrderRepo.findOne(input.id);
  } else {
    if (!student) return HandelStatus(404, "Không tìm thấy SV");
    if (!bookdetail) return HandelStatus(404, "Không tìm thấy sách");
    bookOrder = await BookOrderRepo.findOne({
      student: student,
      bookdetail: bookdetail,
      payDate: null,
    });
  }
  if (!bookOrder) return HandelStatus(404);
  let user = await UserRepo.findOne(input.userCheckOutId);
  if (!bookOrder || !user) return HandelStatus(404);
  bookOrder.userCheckOut = user;
  bookOrder = mapObject(bookOrder, input);
  try {
    await BookOrderRepo.update(bookOrder.id, bookOrder);
    io.emit("newOrder");
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
  try {
    let result = plainToClass(BookOrderInfoDto, bookOrders, {
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
    let result = plainToClass(BookOrderInfoDto, bookOrders, {
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
  if (!bookOrder) return HandelStatus(404);
  try {
    let result = plainToClass(BookOrderInfoDto, bookOrder, {
      excludeExtraneousValues: true,
    });
    return HandelStatus(200, null, result);
  } catch (e) {
    return HandelStatus(500);
  }
};
const getBookOrderHistory = async (take: number, skip: number) => {
  let BookOrderRepo = getRepository(BookOrder);
  let bookOrder = await BookOrderRepo.find({
    relations: ["bookdetail", "bookdetail.book", "student"],
    order: {
      update_at: "DESC",
    },
    cache: false,
    take: take || 10,
    skip: skip || 0,
  });
  if (bookOrder.length == 0) return HandelStatus(404);
  try {
    let result = plainToClass(BookOrderList, bookOrder, {
      excludeExtraneousValues: true,
    });
    return HandelStatus(200, null, result);
  } catch (e) {
    return HandelStatus(500, e.name);
  }
};
const getBookOrderHistoryCount = async (amountDay: number) => {
  let bookOrderRepo = getRepository(BookOrder);
  let bookOrderBorrowCount = await bookOrderRepo.count({
    where: {
      borrowDate: MoreThan(DateMap.addDate(new Date(), -amountDay || -7)),
      payDate: IsNull(),
    },
  });
  let bookOrderPayCount = await bookOrderRepo.count({
    where: {
      borrowDate: MoreThan(DateMap.addDate(new Date(), -amountDay || -7)),
      payDate: Not(IsNull()),
    },
  });
  return HandelStatus(200, null, {
    borrow: bookOrderBorrowCount,
    paid: bookOrderPayCount,
  });
};
export const BookOrderService = {
  Create,
  RemoveById,
  PayBook,
  GetBookOrderBorrowed,
  GetBookOrderPaid,
  getById,
  getBookOrderHistory,
  getBookOrderHistoryCount,
};
