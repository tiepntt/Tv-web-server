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
    @PrimaryColumn({ nullable: false })
    id: string;
    @Column({ nullable: false })
    name: string;
    @OneToMany(type => BookOrder, o => o.student)
    @JoinColumn()
    bookorders: BookOrder[];

}   
