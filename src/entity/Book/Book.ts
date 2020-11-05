import {
  Entity,
  Column,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
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
  @Column({ nullable: false, unique: true, length: 10 })
  idBook: string;

  @Column({ nullable: false, charset: "utf8", type: "nvarchar" })
  name: string;
  @Column()
  price: number;
  @Column({ default: 0, nullable: true })
  amount: number;
  @DeleteDateColumn()
  delete_at: Date;
  @CreateDateColumn()
  create_at: Date;
  @UpdateDateColumn()
  update_at: Date;
  @ManyToOne((type) => User)
  @JoinColumn()
  userDelete: User;
  @OneToMany((type) => BookDetail, (o) => o.book, {
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  })
  @JoinColumn()
  bookdetails: BookDetail[];
}
