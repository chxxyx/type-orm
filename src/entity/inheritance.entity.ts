import { ChildEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, TableInheritance, UpdateDateColumn } from 'typeorm';

export class BaseModel {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

@Entity()
export class BookModel extends BaseModel {

    @Column()
    name: string;

}

@Entity() 
export class CarModel extends BaseModel {
    @Column()
    brand: string;

}

// 하나의 테이블로 여러 엔티티들을 관리할 때
@Entity()
@TableInheritance({
    column: {
        name:  'type', // 테이블에 해당히는 로우가 컴퓨터에 들어가는 로우인지, 비행기에 들어가는 로우인지 
        // 구분이 필요해서 사용하는 추가 컬럼명 !
        type: 'varchar',
        // === 타입이라는 이름의 컬럼명으로 데이터 타입은 varchar
    }
})
export class SingleBaseModel {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

@ChildEntity()
export class ComputerModel extends SingleBaseModel {
    @Column()
    brand: string;
}
@ChildEntity()
export class AirplaneModel extends SingleBaseModel {
    @Column()
    country: string;
}