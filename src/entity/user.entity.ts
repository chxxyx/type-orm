import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from "typeorm";

export enum Role {
    USER = 'user',
    ADMIN = 'admin',
}

@Entity()
export class UserModel {

    @PrimaryGeneratedColumn() // 자동 ID 생성 컬럼 -> 자동
    //@PrimaryColumn() // 그냥 주가 되는 컬럼이라는 뜻, 각각의 로우 구분 컬럼, 모든 테이블에서 기본적으로 존재해야 함 -> 수정
    id: number;

    @Column(
        // {
        //     type: 'varchar', // DB에서 인지하는 컬럼 타입, 자동으로 유추됨
        //     name: 'title', // DB 컬럼 이름, 프로퍼티 이름으로 자동 유추된다.
        //     length: 300, // 값의 길이, 입력할 수 있는 글자의 길이가 300 대신 varchar 타입만 길이 지정 가능 text X
        //     nullable: false, // null 가능 여부
        //     update: false, // true면 맨 처음 저장할 때만 값 지정 가능 이후에는 값 변경 불가능
        //     select: true // find()를 실행할 때 기본으로 값을 불러올지, 기본값은 true 
        //      // -> find 함수 실행 시 특정 데이터만 불러오게 요청할 수 있는데, 그런 게 없을 시 기본적으로 데이터를 반환할 건지에 대한 여부
        //     default: 'default value' // 생성 시 기본으로 들어가는 기본값
        //     unique: false, // 컬럼 중에서 유일무이한 값이 돼야 하는지에 대한 여부, ex) 무조건 하나의 로우 값이 다른 로우와의 값과 같은 값이면 X 
        // }
    ) // 실제 테이블의 컬럼과 아래 값을 매핑한다. -- 원래 원칙적으로는 다 입력을 해줘야 하지만, 타입 예상
    title: string; 

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER,
        
    })
    role: Role;

    @CreateDateColumn() // 생성 날짜와 시간 자동으로 찍힘
    createdAt: Date;

    @UpdateDateColumn()  // 수정 날짜와 시간 자동으로 찍힘
    updatedAt: Date;

    // 데이터가 업데이트 될 때마다 1씩 올라간다.
    // 처음 생성되면 값은 1이다.
    // save() 함수가 몇 번 불렸는 지 기억
    @VersionColumn()
    version: number;

    // @Column()
    // @Generated('increment')
    // additionalId: number;
    @Column()
    @Generated('uuid')
    additionalId: string;

}