
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    PrimaryColumn,
    OneToMany,
    JoinColumn, ManyToMany, ManyToOne
} from "typeorm";



@Entity()
export class Mesenger {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    UserAId : number;
    @Column()
    UserBId : number;

}
