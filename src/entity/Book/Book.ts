import {
  Entity,
  Column,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BookDetail } from "./BookDetails";
export type BookConfig = {
  id?: string;
  name?: string;
  price?: number;
  amount?: number;
};
@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  idBook: string;
  @Column({ nullable: false, charset: 'utf8' })
  name: string;
  @Column()
  price: number;
  @Column({ default: 0, nullable: true })
  amount: number;

  @OneToMany((type) => BookDetail, (o) => o.book, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn()
  bookdetails: BookDetail[];
}
