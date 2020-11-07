import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
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
  @Column({ nullable: false, unique: true, length: 20 })
  idBookDetails: string;
  @ManyToOne((type) => Book, { onDelete: "SET NULL", onUpdate: "CASCADE" })
  @JoinColumn()
  book: Book;
  @CreateDateColumn()
  createAt: Date;
  @UpdateDateColumn()
  update_at: Date;
  @DeleteDateColumn()
  DeleteAt: Date;
  @ManyToOne((type) => User)
  @JoinColumn()
  userDelete: User;
}
