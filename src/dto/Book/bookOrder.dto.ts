import { Expose, Type } from "class-transformer";
import { StudentGetDto, StudentTitleDto } from "../student/student.dto";
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
  userCheckIn: UserInfoTitleDto;
  @Expose()
  @Type((type) => UserInfoTitleDto)
  userCheckOut: UserInfoTitleDto;
}
export class BookOrderPayDto {
  @Expose()
  idBookDetail: string;
  @Expose()
  id: number;
  @Expose()
  studentId: string;
  @Expose()
  payDate: Date;
  @Expose()
  userCheckOutId: number;
}
export class BookOrderList {
  @Expose()
  id: number;
  @Expose()
  @Type((o) => BookDetailGetDto)
  bookdetail: BookDetailGetDto;
  @Expose()
  @Type((o) => StudentTitleDto)
  student: StudentTitleDto;
  @Expose()
  type: boolean;
  @Expose()
  update_at: Date;
  @Expose()
  payDate: Date;
  @Expose()
  borrowDate: Date;
}
