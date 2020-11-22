import { plainToClass } from "class-transformer";
import { getRepository, IsNull, Like, Not } from "typeorm";
import { HandelStatus } from "../../controllers/HandelAction";
import { BookInputDto, BookTitleDto } from "../../dto/Book/book.dto";
import { Book } from "../../entity/Book/Book";
import { mapObject } from "../../utils/map";

const Create = async (bookConfig: BookInputDto) => {
  let BookRepo = getRepository(Book);

  if (!bookConfig.name || !bookConfig.price || !bookConfig.idBook) {
    return HandelStatus(204);
  }
  let bookGet = await BookRepo.findOne({
    idBook: bookConfig.idBook,
  });
  if (bookGet) {
    return HandelStatus(302);
  }
  let book = plainToClass(Book, bookConfig);
  try {
    await BookRepo.save(book);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500);
  }
};
const Update = async (bookConfig: BookInputDto) => {
  let BookRepo = getRepository(Book);
  if (!bookConfig.idBook) {
    return HandelStatus(204);
  }
  let book = await BookRepo.findOne({ idBook: bookConfig.idBook });
  if (!book) {
    return HandelStatus(404);
  }
  book = mapObject(book, bookConfig);
  try {
    await BookRepo.update(book.id, book);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500);
  }
};
const DeleteByIdBook = async (idBook) => {
  let BookRepo = getRepository(Book);
  let book = await BookRepo.findOne({ idBook: idBook });
  if (!book) {
    return HandelStatus(404);
  }
  await BookRepo.remove(book);
  return HandelStatus(200);
};
const GetAll = async (take: number, skip: number, key: string) => {
  let BookRepo = getRepository(Book);
  let books = await BookRepo.find({
    order: {
      create_at: "DESC",
    },
    where: [
      {
        name: Like(`%${key}%`),
      },
      {
        idBook: Like(`%${key}%`),
      },
    ],
    take: take,
    skip: skip,
  });
  try {
    let result = plainToClass(BookTitleDto, books, {
      excludeExtraneousValues: true,
    });
    return HandelStatus(200, null, result);
  } catch (e) {
    return HandelStatus(500);
  }
};
const GetById = async (idBook: string) => {
  let BookRepo = getRepository(Book);
  let book = await BookRepo.findOne({ idBook: idBook });

  if (!book) return HandelStatus(404);
  return HandelStatus(200, null, book);
};
const getCount = async () => {
  let count = await getRepository(Book).count();
  return HandelStatus(200, null, { count });
};
export const BookService = {
  Create,
  Update,
  DeleteByIdBook,
  GetAll,
  GetById,
  getCount,
};
