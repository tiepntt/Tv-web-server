
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    PrimaryColumn,
    OneToMany,
    JoinColumn, ManyToMany, ManyToOne
} from "typeorm";
import { User } from "../User/User";



@Entity()
export class MesengerContent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, type: "text" })
    content: string;
    @Column({ nullable: true, type: "text" })
    assets: string;
    @ManyToOne(type => User, { onUpdate: "CASCADE", onDelete: "CASCADE" })
    @JoinColumn()
    user: User;

}
