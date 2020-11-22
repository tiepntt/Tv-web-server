import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { transformer } from "../../libs/DateTime";
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
  @OneToMany((type) => Like, (o) => o.poster)
  @JoinColumn()
  likes: Like[];
  @OneToMany((type) => Comment, (o) => o.poster)
  @JoinColumn()
  comments: Comment[];
  @ManyToOne((type) => User, (o) => o.posts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  userCreate: User;
  @CreateDateColumn({
    transformer: transformer,
  })
  create_at: Date;
  @UpdateDateColumn({
    transformer: transformer,
  })
  update_at: Date;
  @DeleteDateColumn()
  delete_at: Date;
  @ManyToMany((type) => User, { onUpdate: "CASCADE" })
  @JoinTable()
  userSubscribe: User[];
}
