import moment = require("moment");
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  ManyToOne,
  Timestamp,
  UpdateDateColumn,
} from "typeorm";
import { transformer } from "../../libs/DateTime";
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
  })
  borrowDate: Date;
  @Column({
    nullable: true,
  })
  payDate: Date;
  @UpdateDateColumn({
    transformer: transformer,
  })
  update_at: Date;

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
    transformer: transformer,
  })
  deadline: Date;
  @ManyToOne((type) => User, { onDelete: "SET NULL", onUpdate: "CASCADE" })
  @JoinColumn()
  userCheckIn: User;
  @ManyToOne((type) => User, { onDelete: "SET NULL", onUpdate: "CASCADE" })
  @JoinColumn()
  userCheckOut: User;
}
