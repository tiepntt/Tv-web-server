import moment = require("moment");
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  ManyToOne,
  Timestamp,
} from "typeorm";
import { Student } from "../Student/Student";
import { User } from "../User/User";
import { BookDetail } from "./BookDetails";

export type BookOrderConfig = {
  id?: number;
  BorrowDate?: Date;
  PayDate?: Date;
  bookdetailId?: string;
  studentId?: string;
  userCheckIn?: number;
  userCheckOut?: number;
};
@Entity()
export class BookOrder {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  borrowDate: Date;
  @Column({ nullable: true })
  payDate: Date;
  @ManyToOne((type) => BookDetail, (o) => o.bookOrders, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  bookdetail: BookDetail;
  @ManyToOne((type) => Student, (o) => o.bookOrders, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  student: Student;
  @Column({
    nullable: false,
  })
  deadline: Date;
  @ManyToOne((type) => User)
  @JoinColumn()
  userCheckIn: User;
  @ManyToOne((type) => User)
  @JoinColumn()
  userCheckOut: User;
}
