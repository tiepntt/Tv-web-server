import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
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
  @Column({ unique: true, length: 10 })
  Code: string;

  @Column({ default: false })
  isSendEmail: boolean;
  @Column({ default: false })
  isCreateOrEditSheet: boolean;
  @Column({ default: false })
  isCreateOrEditBook: boolean;
  @Column({ default: false })
  isCreateOrEditUser: boolean;
  @Column({ default: false })
  isCreateOrEditStudent: boolean;
}
