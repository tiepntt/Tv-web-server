import { type } from "os";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    PrimaryColumn,
    OneToMany,
    JoinColumn,
} from "typeorm";
import { BookOrder } from "../Book/BookOrder";


@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ nullable: false })
    name: string;
    @OneToMany(type => BookOrder, o => o.student, { onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn()
    bookorders: BookOrder[];

}   
