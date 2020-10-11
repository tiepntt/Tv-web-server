import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn, OneToOne, ManyToOne
} from "typeorm";
import { User } from "../User/User";
import { Poster } from "./Poster";

export type LikeConfig = {
  id?: number;
  createTime?: Date;
  userId?: number;
  posterId?: number;
}
@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne((type) => Poster, (o) => o.likes)
  @JoinColumn()
  poster: Poster;
  @ManyToOne((type) => User, user => user.likes)
  @JoinColumn()
  user: User;
  @Column()
  createTime: Date;

}
