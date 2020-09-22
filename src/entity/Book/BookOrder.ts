import { type } from "os";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
  ManyToOne,
  ManyToMany,
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
  userId1?: number;
  userId2?: number;
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
  @ManyToOne((type) => Student, (o) => o.bookorders, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  student: Student;

  @ManyToOne((type) => User, { onUpdate: "CASCADE", onDelete: "CASCADE" })
  @JoinColumn()
  User1: User;
  @ManyToOne((type) => User, { onUpdate: "CASCADE", onDelete: "CASCADE" })
  @JoinColumn()
  User2: User;
}
