import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserModel } from "./user.entity";

@Entity()
export class PostModel {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserModel, (user) => user.posts) // one이 되는 테이블일 경우 복수형
    author: UserModel;

    @Column()
    title: string; 
}