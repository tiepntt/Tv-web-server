import { Expose, Type } from "class-transformer";
import { BookTitleDto } from "./book.dto";

export class BookDetailInputDto {
  @Expose()
  id: number;
  @Expose()
  idBookDetails: string; //masach
  @Expose()
  idBook: string; //masach
}
export class BookDetailGetDto {
  @Expose()
  id: number;
  @Expose()
  idBookDetails: string; //masach
  @Expose()
  @Type((type) => BookTitleDto)
  book: BookTitleDto;
}
