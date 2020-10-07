import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Department } from "./Department";
import { Role } from "./Role";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

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
}
