
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    PrimaryColumn,
    OneToMany,
    JoinColumn, ManyToMany, ManyToOne
} from "typeorm";
import { User } from "../User/User";
import { Poster } from "./Poster";


@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, type: "text" })
    content: string;
    @Column({ nullable: true })
    asset: string;
    @OneToMany(type => Poster, o => o.likes)
    @JoinColumn()
    poster: Poster;
    @ManyToOne(type => User)
    @JoinColumn()
    user: User;

}
