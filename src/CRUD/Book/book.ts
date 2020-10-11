import { getRepository } from "typeorm";
import { HandelStatus } from "../../controllers/HandelAction";
import { Book, BookConfig } from "../../entity/Book/Book";

export const Create = async (bookConfig: BookConfig) => {
  let BookRepo = getRepository( Book );
  
  if (!bookConfig.name || !bookConfig.price || !bookConfig.id) {
    return HandelStatus(204);
  }
  let bookget = await BookRepo.findOne({ idBook: bookConfig.id });
  if (bookget) {
    return HandelStatus(302);
  }
  var book = new Book();
  book.name = bookConfig.name;
  book.idBook = bookConfig.id;
  book.amount = bookConfig.amount || 0;
  book.price = bookConfig.price || 0;
  await BookRepo.save(book);
  return HandelStatus(200);
};
export const Update = async (bookConfig: BookConfig) => {
  let BookRepo = getRepository(Book);
  if ( !bookConfig.id )
  {
    
    return HandelStatus(204);
  }
  var book = new Book();
  let bookget = await BookRepo.findOne({ idBook: bookConfig.id });
  if (!bookget) {
    return HandelStatus(404);
  }
  book.name = bookConfig.name || book.name;
  book.amount = bookConfig.amount || book.amount;
  book.price = bookConfig.price || book.price;
  await BookRepo.update(book.id, book);
  return HandelStatus(200);
};
export const DeleteByIdBook = async (idBook) => {
  let BookRepo = getRepository(Book);
  var book = await BookRepo.findOne({ idBook: idBook });
  if (!book) {
    return HandelStatus(404);
  }
  await BookRepo.remove(book);
  return HandelStatus(200);
};
export const GetAll = async () => {
  let BookRepo = getRepository(Book);
  var books = await BookRepo.find();
  return HandelStatus(200, null, books);
};
export const GetById = async (idBook) => {
  let BookRepo = getRepository(Book);
  let book = await BookRepo.findOne({ idBook: idBook });
  if (!book) return HandelStatus(404);
  return HandelStatus(200, null, book);
};
