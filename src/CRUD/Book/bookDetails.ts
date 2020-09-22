import { getRepository } from "typeorm";
import { HandelStatus } from "../../controllers/HandelAction";
import { Book } from "../../entity/Book/Book";
import { BookDetail, bookDetailConfig } from "../../entity/Book/BookDetails";

export const Create = async (bookDetailConfig: bookDetailConfig) => {
  let BookDetailsRepo = getRepository(BookDetail);
  let BookRepo = getRepository(Book);
  if (!bookDetailConfig.id || !bookDetailConfig.bookid) {
    return HandelStatus(204);
  }
  var bookDetail = new BookDetail();
  let getBookD = await BookDetailsRepo.findOne({ id: bookDetail.id });

  let getBook = await BookRepo.findOne({ idBook: bookDetailConfig.bookid });
  if (getBookD || !getBook) {
    return HandelStatus(500);
  }
  bookDetail.idBookDetails = bookDetailConfig.id;
  bookDetail.book = getBook;
  await BookDetailsRepo.save(bookDetail);
  return HandelStatus(200);
};
