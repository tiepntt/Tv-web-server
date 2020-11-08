import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { BookOrder } from "../Book/BookOrder";
import { Faculty } from "./Faculty";


@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, unique: true, length: 10 })
  idStudent: string;
  @Column({ nullable: false, type: "nvarchar", length: 555, charset: "utf8" })
  name: string;
  @Column({ nullable: true })
  born: Date;
  @Column({ nullable: true })
  grade: string;
  @Column({ nullable: true, type: "text" })
  note: string;
  @OneToMany((type) => BookOrder, (o) => o.student)
  @JoinColumn()
  bookOrders: BookOrder[];
  @ManyToOne((type) => Faculty, (o) => o.students)
  @JoinColumn()
  faculty: Faculty;
}
