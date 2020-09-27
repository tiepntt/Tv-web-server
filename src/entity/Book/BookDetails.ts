import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Book } from "./Book";

export type bookDetailConfig = {
  id?: string;
  bookid?: string;
};
@Entity()
export class BookDetail {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  idBookDetails: string;
  @ManyToOne((type) => Book, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn()
  book: Book;
}
