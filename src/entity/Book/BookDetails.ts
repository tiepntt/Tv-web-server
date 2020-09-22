import { type } from "os";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  OneToMany,
  JoinColumn, ManyToOne
} from "typeorm";
import { Book } from "./Book";

export type bookDetailConfig = {
  id?: string,
  bookid?: string;

}
@Entity()
export class BookDetail {
  @PrimaryColumn({ nullable: false })
  id: string;
  @ManyToOne(type => Book, o => o.bookdetails, { onUpdate: "CASCADE", onDelete: "CASCADE" })
  @JoinColumn()
  book: Book;
}
