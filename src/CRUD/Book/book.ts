import { plainToClass } from "class-transformer";
import { getRepository, IsNull, Not } from "typeorm";
import { HandelStatus } from "../../controllers/HandelAction";
import { BookInputDto } from "../../dto/Book/book.dto";
import { Book, BookConfig } from "../../entity/Book/Book";

const Create = async (bookConfig: BookInputDto) => {
  let BookRepo = getRepository(Book);

  if (!bookConfig.name || !bookConfig.price || !bookConfig.idBook) {
    return HandelStatus(204);
  }
  let bookget = await BookRepo.findOne({
    idBook: bookConfig.idBook,
  });
  if (bookget) {
    return HandelStatus(302);
  }
  let book = plainToClass(Book, bookConfig);
  try {
    await BookRepo.save(book);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const Update = async (bookConfig: BookInputDto) => {
  let BookRepo = getRepository(Book);
  if (!bookConfig.id) {
    return HandelStatus(204);
  }
  var book = new Book();
  let bookget = await BookRepo.findOne({ idBook: bookConfig.idBook });
  if (!bookget) {
    return HandelStatus(404);
  }
  book.name = bookConfig.name || book.name;
  book.amount = bookConfig.amount || book.amount;
  book.price = bookConfig.price || book.price;
  await BookRepo.update(book.id, book);
  return HandelStatus(200);
};
const DeleteByIdBook = async (idBook) => {
  let BookRepo = getRepository(Book);
  var book = await BookRepo.findOne({ idBook: idBook });
  if (!book) {
    return HandelStatus(404);
  }
  await BookRepo.remove(book);
  return HandelStatus(200);
};
const GetAll = async (take: number, skip: number) => {
  let BookRepo = getRepository(Book);
  var books = await BookRepo.find({
    take: take,
    skip: skip,
  });
  return HandelStatus(200, null, books);
};
const GetById = async (idBook) => {
  let BookRepo = getRepository(Book);
  let book = await BookRepo.findOne({ idBook: idBook });
  if (!book) return HandelStatus(404);
  return HandelStatus(200, null, book);
};
export const BookService = { Create, Update, DeleteByIdBook, GetAll, GetById };
