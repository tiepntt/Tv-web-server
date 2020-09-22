import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
} from "typeorm";
import { Department } from "./Department";
import { Role } from "./Role";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ charset: "utf8" })
  Name: string;

  @Column({ nullable: true, default: "2000-01-01" })
  born: Date;
  @Column({ charset: "utf8" })
  username: string;

  @Column({ charset: "utf8" })
  password: string;

  @ManyToOne((type) => Role, (role) => role.users, { onUpdate: "CASCADE", onDelete: "CASCADE" })
  @JoinColumn()
  role: Role;

  @ManyToOne((type) => Department, (department) => department.users, { onUpdate: "CASCADE", onDelete: "CASCADE" })
  @JoinColumn()
  department: Department;
}
