import {
  Entity,
  Column,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn, ManyToOne
} from "typeorm";
import { User } from "../User/User";
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
  @Column({ nullable: false, unique: true })

  idBook: string;

  @Column({ nullable: false, charset: "utf8", type: "nvarchar" })
  name: string;
  @Column()
  price: number;
  @Column({ default: 0, nullable: true })
  amount: number;
  @Column({ nullable: true })
  createAt: Date;
  @Column({ nullable: true })
  DeleteAt: Date;
  @ManyToOne((type) => User)
  @JoinColumn()
  userDelete: User;
  @OneToMany((type) => BookDetail, (o) => o.book, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn()
  bookdetails: BookDetail[];

}
