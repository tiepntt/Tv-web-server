import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn, OneToOne
} from "typeorm";
import { User } from "../User/User";
import { Poster } from "./Poster";

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: 0, nullable: true })
  amount: number;
  @Column({ nullable: true })
  urlAssets: string;
  @Column({ nullable: true })
  content: string;
  @OneToMany((type) => Poster, (o) => o.likes)
  @JoinColumn()
  poster: Poster;
  @OneToOne((type) => User)
  @JoinColumn()
  user: User;

}
