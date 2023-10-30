import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// 새로운 클래스로 중복되는 엔터티들을 작성할 수 있다. 
export class Name {

    @Column()
    first: string;

    @Column()
    lats: string;
}

@Entity()
export class StudentModel{
    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => Name)
    name: Name;

    @Column()
    class: string;

}

@Entity()
export class TeacherModel{

    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => Name)
    name: Name;

    @Column()
    salary: number;
}