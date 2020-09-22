
import { text } from "body-parser";
import { type } from "os";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    PrimaryColumn,
    OneToMany,
    JoinColumn, ManyToMany, ManyToOne
} from "typeorm";
import { Comment } from "./Comment";

import { Like } from "./Like"
import { Poster } from "./Poster";
@Entity()
export class NotificalPoster {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: "text" })
    context: string;
    @ManyToOne(type => Poster, { onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn()
    poster: Poster;
}
