import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throwIfEmpty } from 'rxjs';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import { UserModel, Role } from './entity/user.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>
  ) {}

  @Post('users')
  postUser() {
    return this.userRepository.save({
      title: 'test title',
      role: Role.ADMIN
    });
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      // select: {
      //   id: true,
      //   title: true,
      // }
    });
  }
 
  @Patch('users/:id') // 수정할 때마다 version 수 증가 === save()가 불렸는 지에 대한 기억
  async patchUser(
    @Param('id') id: string,
  ) {
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id)
      }
    })

    return this.userRepository.save({
      ...user,
      title: user.title + '0',
    })
  }
}
