import { TagModel } from './entity/tag.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AirplaneModel, BookModel, CarModel, SingleBaseModel } from './entity/inheritance.entity';
import { StudentModel, TeacherModel } from './entity/person.entity';
import { PostModel } from './entity/post.entity';
import { ProfileModel } from './entity/profile.entity';
import { UserModel } from './entity/user.entity';

@Module({
  imports: [
    
    TypeOrmModule.forFeature([
        UserModel,
        StudentModel,
        TeacherModel,
        ProfileModel,
        PostModel,
        TagModel,
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
        ProfileModel,
        PostModel,
        TagModel,
      ],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
