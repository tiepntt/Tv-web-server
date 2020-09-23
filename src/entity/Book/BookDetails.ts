import { type } from "os";
import {
  Entity,
  Column,
  PrimaryColumn,
  JoinColumn,
  ManyToOne, PrimaryGeneratedColumn
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
  @ManyToOne((type) => Book)
  @JoinColumn()
  book: Book;
}
