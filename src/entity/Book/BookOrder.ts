import { type } from "os";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    PrimaryColumn,
    OneToMany,
    JoinColumn, OneToOne, ManyToOne, ManyToMany
} from "typeorm";
import { Student } from "../Student/Student";
import { User } from "../User/User";
import { BookDetail } from "./BookDetails";


@Entity()
export class BookOrder {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    BorrowDate: Date;
    @Column({ nullable: true })
    PayDate: Date;
    @OneToOne(type => BookDetail)
    @JoinColumn()
    bookdetail: BookDetail;
    @ManyToOne(type => Student, o=> o.bookorders)
    student : Student;

    @ManyToOne(type => User)
    @JoinColumn()
    User1: User;
    @ManyToOne(type => User)
    @JoinColumn()
    User2: User;





}
