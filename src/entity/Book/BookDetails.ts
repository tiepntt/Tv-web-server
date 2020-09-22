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

@Entity()
export class BookDetail {
  @PrimaryColumn({ nullable: false })
  id: string;
  @ManyToOne(type => Book, o => o.bookdetails)
  @JoinColumn()
  book: Book;
  @Column({ default: 0, nullable: true })
  amount: number;

}
