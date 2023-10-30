import { TagModel } from './tag.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserModel } from "./user.entity";

@Entity()
export class PostModel {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserModel, (user) => user.posts) // one이 되는 테이블일 경우 복수형
    author: UserModel;

    @Column()
    title: string; 

    @ManyToMany(() => TagModel, (tag) => tag.posts)
    @JoinTable() // many to many는 둘 중 어느 모델이든 상관없이 JoinTable 어노테이션을 입력해줘야 한다. 
    tags: TagModel[]; // 각각 서로가 서로의 여러 개를 참조할 수 있다 !
}