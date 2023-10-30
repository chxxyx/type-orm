import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AirplaneModel, BookModel, CarModel, SingleBaseModel } from './entity/inheritance.entity';
import { StudentModel, TeacherModel } from './entity/person.entity';
import { ProfileModel } from './entity/profile.entity';
import { UserModel } from './entity/user.entity';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([
        UserModel,
        StudentModel,
        TeacherModel,
        ProfileModel
    ])
    ,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'typeormstudy',
      entities: [
        UserModel, 
        StudentModel, 
        TeacherModel, 
        CarModel, 
        BookModel, 
        AirplaneModel, 
        SingleBaseModel,
        ProfileModel],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
