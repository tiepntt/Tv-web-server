import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { User } from "../User/User";

@Entity()
export class MesengerContent {
  @PrimaryGeneratedColumn()
  id: number;
  Y;

  @Column({ nullable: true, type: "text", charset: "utf8" })
  content: string;
  @Column({ nullable: true, type: "text" })
  assets: string;
  @ManyToOne((type) => User, { onUpdate: "CASCADE", onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
}
