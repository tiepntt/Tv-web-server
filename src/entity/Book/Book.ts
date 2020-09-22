
import {
    Entity,
    Column,
    PrimaryColumn,
    OneToMany,
    JoinColumn,
} from "typeorm";
import { BookDetail } from "./BookDetails";
export type BookConfig = {
    id?: string,
    name?: string,
    price?: number,
    amount?: number,
}
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

    @OneToMany((type) => BookDetail, o => o.book, { onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn()
    bookdetails: BookDetail[];
}
