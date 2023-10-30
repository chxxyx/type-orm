import { UserModel } from './user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProfileModel {

    @PrimaryGeneratedColumn()
    id: number;
    // 관계선언할 객체, 객체 안의 프로퍼티 중에서도 어떤 프로퍼티와 연결할 건지
    @OneToOne(()=> UserModel, (user)=> user.profile)
    @JoinColumn()
    user: UserModel;

    @Column()
     profileImg: string;
}