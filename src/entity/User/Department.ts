import { type } from "os";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "nvarchar", length: 555, charset: "utf8" })
  name: string;

  @OneToMany((type) => User, (user) => user.department, { onUpdate: "CASCADE", onDelete: "CASCADE" })
  @JoinColumn()
  users: User[];
}
