import { getRepository } from "typeorm";
import { HandelStatus } from "../../controllers/HandelAction";
import { Book, BookConfig } from "../../entity/Book/Book";

export const Create = async (bookConfig: BookConfig) => {
  let BookRepo = getRepository(Book);
  if (!bookConfig.name || !bookConfig.price || !bookConfig.id) {
    return HandelStatus(204);
  }
  var book = new Book();
  book.name = bookConfig.name;
  book.idBook = bookConfig.id;
  book.amount = bookConfig.amount || 0;
  book.price = bookConfig.price || 0;
  await BookRepo.save(book);
  return HandelStatus(200);
};
