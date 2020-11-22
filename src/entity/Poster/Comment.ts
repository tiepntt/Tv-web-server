import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { transformer } from "../../libs/DateTime";
import { User } from "../User/User";
import { Poster } from "./Poster";
export type commentConfig = {
  id?: number;
  content?: string;
  asset?: string;
  userId?: number;
  createTime?: Date;
  posterId?: number;
};
@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: "text", charset: "utf8" })
  content: string;
  @Column({ nullable: true })
  asset: string;
  @ManyToOne((type) => Poster, (o) => o.likes, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn()
  poster: Poster;
  @ManyToOne((type) => User, (o) => o.comments, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;
  @CreateDateColumn({
    transformer: transformer,
  })
  create_at: Date;
}
