import { type } from "os";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    PrimaryColumn,
    OneToMany,
    JoinColumn,
} from "typeorm";
import { BookDetail } from "./BookDetails";

@Entity()
export class Book {
    @PrimaryColumn({ nullable: false })
    id: string;
    @Column({ nullable: false })
    name: string;
    @Column()
    price: number;
    @Column({ default: 0, nullable: true })
    amount: number;

    @OneToMany((type) => BookDetail, o => o.book)
    @JoinColumn()
    bookdetails: BookDetail[];
}
