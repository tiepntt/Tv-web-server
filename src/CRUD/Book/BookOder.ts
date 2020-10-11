import { getRepository } from "typeorm";
import { HandelStatus } from "../../controllers/HandelAction";
import { BookDetail } from "../../entity/Book/BookDetails";
import { BookOrder, BookOrderConfig } from "../../entity/Book/BookOrder";
import { Student } from "../../entity/Student/Student";
import { User } from "../../entity/User/User";
import { genBorn } from "../../libs/Book";

export const Create = async (bookOrderConfig: BookOrderConfig) => {
  let BookOrderRepo = getRepository(BookOrder);
  let UserRepo = getRepository(User);
  let BookDetailRepo = getRepository(BookDetail);
  let StudentRepo = getRepository(Student);
  if (
    !bookOrderConfig.bookdetailId ||
    !bookOrderConfig.studentId ||
    !bookOrderConfig.userCheckIn
  ) {
    return HandelStatus(204);
  }

  let user = await UserRepo.findOne(bookOrderConfig.userCheckIn);

  let bookdetail = await BookDetailRepo.findOne({
    idBookDetails: bookOrderConfig.bookdetailId,
  });
  let student = await StudentRepo.findOne({
    idStudent: bookOrderConfig.studentId,
  });

  if (!user || !bookdetail || !student) {
    return HandelStatus(500);
  }
  let bookOrder = new BookOrder();
  bookOrder.student = student;
  bookOrder.UserCheckIn = user;
  bookOrder.bookdetail = bookdetail;
  bookOrder.BorrowDate = new Date(bookOrderConfig.BorrowDate) || new Date();
  await BookOrderRepo.save(bookOrder);
  return HandelStatus(200);
};
export const RemoveById = async (Id) => {
  let BookOrderRepo = getRepository(BookOrder);
  var bookOrder = await BookOrderRepo.findOne(Id);
  if (!bookOrder) return HandelStatus(404);
  await BookOrderRepo.remove(bookOrder);
  return HandelStatus(200);
};
export const PayBook = async (Id, UserId, date?: string) => {
  let BookOrderRepo = getRepository(BookOrder);
  let UserRepo = getRepository(User);
  var bookOrder = await BookOrderRepo.createQueryBuilder("bookOrder")
    .leftJoinAndSelect("bookOrder.bookdetail", "bookdetail")
    .where("bookdetail.idBookDetails =:id", { id: Id })
    .getOne();

  var user = await UserRepo.findOne(UserId);
  if (!bookOrder || !user) return HandelStatus(404);

  bookOrder.PayDate = new Date();
  if (date) {
    bookOrder.PayDate = new Date(genBorn(date));
  }
  bookOrder.UserCheckOut = user;

  await BookOrderRepo.update(bookOrder.id, bookOrder);
  return HandelStatus(200);
};
export const GetBookOrderBorrowed = async (studentId) => {
  let BookOrderRepo = getRepository(BookOrder);
  var bookOrders = await BookOrderRepo.createQueryBuilder("bookOrder")
    .leftJoinAndSelect("bookOrder.student", "student")
    .leftJoinAndSelect("bookOrder.bookdetail", "bookdetail")
    .leftJoinAndSelect("bookdetail.book", "book")
    .leftJoinAndSelect("bookOrder.UserCheckIn", "UserCheckIn")
    .where("bookOrder.PayDate is NULL")
    .andWhere("student.idStudent = :id", { id: studentId })
    .orderBy({ "bookOrder.BorrowDate": "DESC" })
    .getMany();
  var result = [];
  if (bookOrders) {
    bookOrders.forEach((element) => {
      result.push({
        idBook: ((element as any).bookdetail as any).idBookDetails,
        book: ((element as any).bookdetail as any).book.name,
        BorrowDate: (element as any).BorrowDate,
        UserCheckIn: (element as any).UserCheckIn.Name,
      });
    });
  }
  return result;
};
export const GetBookOrderPaid = async (studentId) => {
  let BookOrderRepo = getRepository(BookOrder);
  var bookOrders = await BookOrderRepo.createQueryBuilder("bookOrder")
    .leftJoinAndSelect("bookOrder.student", "student")
    .leftJoinAndSelect("bookOrder.bookdetail", "bookdetail")
    .leftJoinAndSelect("bookdetail.book", "book")
    .leftJoinAndSelect( "bookOrder.UserCheckIn", "UserCheckIn" )
    .leftJoinAndSelect("bookOrder.UserCheckIn", "UserCheckOut")
    .where("bookOrder.PayDate is not NULL")
    .andWhere("student.idStudent = :id", { id: studentId })
    .orderBy({ "bookOrder.BorrowDate": "DESC" })
    .getMany();
  var result = [];
  if (bookOrders) {
    bookOrders.forEach((element) => {
      result.push({
        idBook: ((element as any).bookdetail as any).idBookDetails,
        book: ((element as any).bookdetail as any).book.name,
        BorrowDate: (element as any).BorrowDate,
        userCheckin: ( element as any ).userCheckIn.Name,
        PaidDate: (element as any).BorrowDate,
        userCheckOut: (element as any).UserCheckOut.Name,
      });
    });
  }
  return result;
};
