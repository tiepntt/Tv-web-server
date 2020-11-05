import { Expose, Type } from "class-transformer";
import { UserInfoTitleDto, UserTitleDto } from "../user/user.dto";
import { BookDetailGetDto } from "./book.detail.dto";

export class BookOrderCreateDto {
  id: number;
  @Expose()
  borrowDate: Date;
  @Expose()
  idBookdetail: string;
  @Expose()
  idStudent: string;
  @Expose()
  deadline: Date;
  @Expose()
  userCheckInId: number;
}
export class BookOrderGetDto {
  @Expose()
  id: number;
  @Expose()
  borrowDate: Date;
  @Expose()
  payDate: Date;
  @Expose()
  deadline: Date;
  @Expose()
  @Type((type) => BookDetailGetDto)
  bookdetail: BookDetailGetDto;
}
export class BookOrderInfoDto {
  @Expose()
  id: number;
  @Expose()
  borrowDate: Date;
  @Expose()
  payDate: Date;
  @Expose()
  deadline: Date;
  @Expose()
  @Type((type) => BookDetailGetDto)
  bookdetail: BookDetailGetDto;
  @Expose()
  @Type((type) => UserInfoTitleDto)
  UserCheckIn: UserInfoTitleDto;
  @Expose()
  @Type((type) => UserInfoTitleDto)
  UserCheckOut: UserInfoTitleDto;
}
export class BookOrderPayDto {
  @Expose()
  idBookDetail: string;
  @Expose()
  payDate: Date;
  @Expose()
  userCheckOutId: number;
}
