import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
} from "typeorm";
import { Comment } from "../Poster/Comment";
import { Like } from "../Poster/Like";
import { NotificationPoster } from "../Poster/Notifical";
import { Poster } from "../Poster/Poster";
import { Department } from "./Department";
import { Role } from "./Role";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ charset: "utf8", type: "nvarchar" })
  name: string;
  @Column({ unique: true, length: 30, nullable: false })
  email: string;
  @Column({ default: true, nullable: true })
  gender: boolean;
  @Column({ nullable: true })
  born: Date;
  @Column({ charset: "utf8", type: "nvarchar", unique: true })
  username: string;
  @Column({ charset: "utf8", type: "nvarchar" })
  password: string;
  @Column({
    nullable: true,
    default:
      "https://www.minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg",
  })
  avatar: string;
  @Column({ nullable: true, default: "G-0" })
  GenCode: string;

  @ManyToOne((type) => Role, (role) => role.users, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  role: Role;
  @ManyToOne((type) => Department, (o) => o.users, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  department: Department;
  @Column({ default: false })
  isBlock: boolean;
  @OneToMany((type) => Poster, (o) => o.userCreate)
  @JoinColumn()
  posts: Poster[];
  @OneToMany((type) => Comment, (o) => o.user)
  @JoinColumn()
  comments: Comment[];
  @OneToMany((type) => Like, (o) => o.user)
  @JoinColumn()
  likes: Like[];
  @CreateDateColumn()
  create_at: Date;
  @UpdateDateColumn()
  update_at: Date;
  @DeleteDateColumn()
  delete_at: Date;
  @ManyToMany((type) => NotificationPoster, (o) => o.userSeen, {
    eager: false,
  })
  notificationSeen: NotificationPoster[];
  @ManyToMany((type) => NotificationPoster, (o) => o.userSubscribe, {
    eager: false,
  })
  notificationSubscribe: NotificationPoster[];
}
