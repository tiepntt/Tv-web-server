import {
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "../User/User";
import { Poster } from "./Poster";

export type LikeConfig = {
  id?: number;
  createTime?: Date;
  userId?: number;
  posterId?: number;
};
@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne((type) => Poster, (o) => o.likes, { onDelete: "CASCADE" })
  @JoinColumn()
  poster: Poster;
  @ManyToOne((type) => User, (user) => user.likes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  user: User;
  @CreateDateColumn()
  create_at: Date;
}
