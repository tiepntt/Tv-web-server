
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    PrimaryColumn,
    OneToMany,
    JoinColumn, ManyToMany
} from "typeorm";
import { Poster } from "./Poster";


@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ default: 0, nullable: true })
    amount: number;
    @Column({ nullable: true })
    urlassets: string;
    @Column({ nullable: true })
    content: string;
    @OneToMany(type => Poster, o => o.likes, { onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn()
    poster: Poster;
}
