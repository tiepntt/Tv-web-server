
import { text } from "body-parser";
import { type } from "os";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn, ManyToOne
} from "typeorm";
import { Comment } from "./Comment";

import { Like } from "./Like"
import { Poster } from "./Poster";
@Entity()
export class NotificalPoster {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: "text", charset: 'utf8' })
    context: string;
    @ManyToOne(type => Poster)
    @JoinColumn()
    poster: Poster;
}
