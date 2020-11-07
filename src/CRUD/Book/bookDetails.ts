import { plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { HandelStatus } from "../../controllers/HandelAction";
import {
  BookDetailGetDto,
  BookDetailInputDto,
} from "../../dto/Book/book.detail.dto";
import { Book } from "../../entity/Book/Book";
import { BookDetail, bookDetailConfig } from "../../entity/Book/BookDetails";
const Create = async (bookDetailConfig: BookDetailInputDto) => {
  let BookDetailsRepo = getRepository(BookDetail);
  let BookRepo = getRepository(Book);
  if (!bookDetailConfig.idBook || !bookDetailConfig.idBookDetails) {
    return HandelStatus(204);
  }
  var bookDetail = new BookDetail();
  let getBookD = await BookDetailsRepo.findOne({
    idBookDetails: bookDetailConfig.idBookDetails,
  });

  let getBook = await BookRepo.findOne({ idBook: bookDetailConfig.idBook });

  if (getBookD) {
    return HandelStatus(302, "Ma sach da ton tai");
  }
  if (!getBook) {
    console.log(getBook);

    return HandelStatus(404, "Khong tim thay sach");
  }
  bookDetail.book = getBook;
  bookDetail.idBookDetails = bookDetailConfig.idBookDetails;
  try {
    await BookDetailsRepo.save(bookDetail);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500);
  }
};
const Update = async (bookDetailConfig: BookDetailInputDto) => {
  let BookDetailsRepo = getRepository(BookDetail);
  let BookRepo = getRepository(Book);
  if (!bookDetailConfig.idBookDetails || bookDetailConfig.id) {
    return HandelStatus(204);
  }
  var bookDetail = new BookDetail();
  let getBookD = await BookDetailsRepo.findOne({
    idBookDetails: bookDetailConfig.idBookDetails,
  });

  let getBook = await BookRepo.findOne({ idBook: bookDetailConfig.idBook });
  if (!getBookD || !getBook) {
    return HandelStatus(404);
  }
  bookDetail.book = getBook || bookDetail.book;
  await BookDetailsRepo.save(bookDetail);
  return HandelStatus(200);
};
const GetAll = async (Idbook) => {
  let BookRepo = getRepository(Book);
  var bookDetails = await BookRepo.createQueryBuilder("book")
    .leftJoinAndSelect("book.bookdetails", "bookdetail")
    .where("book.idBook = :id", { id: Idbook })
    .getOne();
  if (!bookDetails) return HandelStatus(404);
  else return HandelStatus(200, null, bookDetails);
};
const GetById = async (IdBookDetail: string) => {
  let BookDetailsRepo = getRepository(BookDetail);
  var bookDetail = await BookDetailsRepo.findOne({
    relations: ["book"],
    where: {
      idBookDetails: IdBookDetail,
    },
  });

  if (!bookDetail) return HandelStatus(404);
  try {
    let result = plainToClass(BookDetailGetDto, bookDetail, {
      excludeExtraneousValues: true,
    });
    return HandelStatus(200, null, result);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const RemoveById = async (IdBookDetail) => {
  let BookDetailsRepo = getRepository(BookDetail);
  var bookDetail = await BookDetailsRepo.findOne({
    idBookDetails: IdBookDetail,
  });
  if (!bookDetail) return HandelStatus(404);
  await BookDetailsRepo.remove(bookDetail);
  return HandelStatus(404);
};
export const BookDetailService = {
  Create,
  Update,
  GetAll,
  GetById,
  RemoveById,
};
