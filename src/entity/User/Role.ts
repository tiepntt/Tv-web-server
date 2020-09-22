import { type } from "os";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "nvarchar", length: 555, charset: "utf8" })
  name: string;

  @OneToMany((type) => User, (user) => user.id)
  @JoinColumn()
  users: User[];
}
