import {
  Entity,
  Column,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Student } from "./Student";


@Entity()
export class Faculty {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, type: "nvarchar", length: 555, charset: "utf8" })
  name: string;
  @OneToMany((type) => Student, (o) => o.faculty, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  @JoinColumn()
  students: Student[];
}
