import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany, OneToOne
} from "typeorm";
import { Comment } from "../Poster/Comment";
import { Like } from "../Poster/Like";
import { Poster } from "../Poster/Poster";
import { Department } from "./Department";
import { Role } from "./Role";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ charset: "utf8", type: "nvarchar" })
  Name: string;

  @Column({ nullable: true, default: "2000-01-01" })
  born: Date;
  @Column({ charset: "utf8", type: "nvarchar", unique: true })
  username: string;

  @Column({ charset: "utf8", type: "nvarchar" })
  password: string;
  @Column({ nullable: true })
  avatar: string;

  @ManyToOne((type) => Role, (role) => role.users)
  @JoinColumn()
  role: Role;

  @ManyToOne((type) => Department)
  @JoinColumn()
  department: Department;
  @Column({ default: false })
  isBlock: boolean;
  @OneToMany((type) => Poster, (o) => o.userCreate, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  posts: Poster[];

  @OneToMany(type => Comment, o => o.user, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn()
  comments: Comment[];
  @OneToMany(type => Like, o => o.user, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn()
  likes: Like[];
}
