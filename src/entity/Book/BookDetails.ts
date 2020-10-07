import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../User/User";
import { Book } from "./Book";

export type bookDetailConfig = {
  id?: string;
  bookid?: string;
};
@Entity()
export class BookDetail {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, unique: true, length: 10 })
  idBookDetails: string;
  @ManyToOne((type) => Book, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn()
  book: Book;
  createAt: Date;
  @Column({ nullable: true })
  DeleteAt: Date;
  @ManyToOne((type) => User)
  @JoinColumn()
  userDelete: User;
}
