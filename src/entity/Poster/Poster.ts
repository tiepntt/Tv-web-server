import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from "typeorm";
import { User } from "../User/User";
import { Comment } from "./Comment";
import { Like } from "./Like";

export type PosterConfig = {
  id?: number;
  content?: string;
  userCreateId?: number;
  createTime?: Date;
  urlAssets?: string;
};
@Entity()
export class Poster {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  urlAssets: string;
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
  @ManyToOne((type) => User, (o) => o.posts)
  @JoinColumn()
  userCreate: User;
  @Column()
  createTime: Date;
}
