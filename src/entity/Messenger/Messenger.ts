import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Mesenger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  UserAId: number;
  @Column()
  UserBId: number;
}
