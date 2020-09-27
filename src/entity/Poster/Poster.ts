import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Comment } from "./Comment";

import { Like } from "./Like";
@Entity()
export class Poster {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0, nullable: true })
  amount: number;
  @Column({ nullable: true })
  urlassets: string;
  @Column({ nullable: true, type: "text", charset: "utf8" })
  content: string;
  @OneToMany((type) => Like, (o) => o.poster, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn()
  likes: Like[];
  @OneToMany((type) => Comment, (o) => o.poster, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn()
  comments: Comment[];
}
