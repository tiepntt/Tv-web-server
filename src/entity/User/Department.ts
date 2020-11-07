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
  @Column({ unique: true, nullable: true, type: "varchar", length: 10 })
  Code: string;
  @OneToMany((type) => User, (user) => user.department)
  @JoinColumn()
  users: User[];
}
