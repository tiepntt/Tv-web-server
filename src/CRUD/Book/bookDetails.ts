import { getRepository } from "typeorm";
import { HandelStatus } from "../../controllers/HandelAction";
import { Book } from "../../entity/Book/Book";
import { BookDetail, bookDetailConfig } from "../../entity/Book/BookDetails";

export const Create = async (bookDetailConfig: bookDetailConfig) => {
  let BookDetailsRepo = getRepository(BookDetail);
  let BookRepo = getRepository(Book);
  if (!bookDetailConfig.bookid || !bookDetailConfig.id) {
    return HandelStatus(204);
  }
  var bookDetail = new BookDetail();
  let getBookD = await BookDetailsRepo.findOne({
    idBookDetails: bookDetailConfig.id,
  });

  let getBook = await BookRepo.findOne({ idBook: bookDetailConfig.bookid });
  if (getBookD || !getBook) {
    return HandelStatus(500);
  }
  bookDetail.idBookDetails = bookDetailConfig.id;

  bookDetail.book = getBook;
  await BookDetailsRepo.save(bookDetail);
  return HandelStatus(200);
};
export const Update = async (bookDetailConfig: bookDetailConfig) => {
  let BookDetailsRepo = getRepository(BookDetail);
  let BookRepo = getRepository(Book);
  if (!bookDetailConfig.bookid || bookDetailConfig.id) {
    return HandelStatus(204);
  }
  var bookDetail = new BookDetail();
  let getBookD = await BookDetailsRepo.findOne({
    idBookDetails: bookDetailConfig.id,
  });

  let getBook = await BookRepo.findOne({ idBook: bookDetailConfig.bookid });
  if (!getBookD || !getBook) {
    return HandelStatus(404);
  }
  bookDetail.book = getBook || bookDetail.book;
  await BookDetailsRepo.save(bookDetail);
  return HandelStatus(200);
};
export const GetAll = async (Idbook) => {
  let BookRepo = getRepository(Book);
  var bookDetails = await BookRepo.createQueryBuilder("book")
    .leftJoinAndSelect("book.bookdetails", "bookdetail")
    .where("book.idBook = :id", { id: Idbook })
    .getOne();
  if (!bookDetails) return HandelStatus(404);
  else return HandelStatus(200, null, bookDetails);
};
export const GetById = async (IdBookDetail) => {
  let BookDetailsRepo = getRepository(BookDetail);
  var bookDetail = await BookDetailsRepo.createQueryBuilder("bookdetails")
    .leftJoinAndSelect("bookdetails.book", "book")
    .where("bookdetails.idBookDetails = :id", { id: IdBookDetail })
    .getOne();
  if (!bookDetail) return HandelStatus(404);
  return HandelStatus(200, null, bookDetail);
};
export const RemoveById = async (IdBookDetail) => {
  let BookDetailsRepo = getRepository(BookDetail);
  var bookDetail = await BookDetailsRepo.findOne({
    idBookDetails: IdBookDetail,
  });
  if (!bookDetail) return HandelStatus(404);
  await BookDetailsRepo.remove(bookDetail);
  return HandelStatus(404);
};
