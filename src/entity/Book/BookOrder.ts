import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from "typeorm";
import { Student } from "../Student/Student";
import { User } from "../User/User";
import { BookDetail } from "./BookDetails";

export type BookOrderConfig = {
  id?: number;
  BorrowDate?: string;
  PayDate?: string;
  bookdetailId?: string;
  studentId?: string;
  userCheckIn?: number;
  userCheckOut?: number;
};
@Entity()
export class BookOrder {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  BorrowDate: Date;
  @Column({ nullable: true })
  PayDate: Date;
  @OneToOne((type) => BookDetail)
  @JoinColumn()
  bookdetail: BookDetail;
  @ManyToOne((type) => Student, (o) => o.bookOrders, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  student: Student;

  @ManyToOne((type) => User)
  @JoinColumn()
  UserCheckIn: User;
  @ManyToOne((type) => User)
  @JoinColumn()
  UserCheckOut: User;
}
