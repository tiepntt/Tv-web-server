import { text } from "body-parser";
import { type } from "os";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "../User/User";
import { Comment } from "./Comment";

import { Like } from "./Like";
import { Poster } from "./Poster";
@Entity()
export class NotificationPoster {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "text", charset: "utf8" })
  context: string;
  @ManyToOne((type) => Poster, { onDelete: "CASCADE" })
  @JoinColumn()
  poster: Poster;
  @ManyToOne((type) => User, { onDelete: "CASCADE" })
  @JoinColumn()
  userCreate: User;
  @CreateDateColumn()
  creat_at: Date;
  @ManyToMany((type) => User, (o) => o.notificationSeen, {
    onUpdate: "CASCADE",
  })
  @JoinTable()
  userSeen: User[];
  @ManyToMany((type) => User, (o) => o.notificationSubscribe)
  @JoinTable()
  userSubscribe: User[];
}
