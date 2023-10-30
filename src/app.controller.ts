import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throwIfEmpty } from 'rxjs';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import { ProfileModel } from './entity/profile.entity';
import { UserModel, Role } from './entity/user.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,

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
      relations: {
        profile: true, // profile 정보도 다 가져옴
      }
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
      // title: user.title + '0',
    })
  }

  @Post('user/profile')
  async createUserAndProfile() {
    const user = await this.userRepository.save({
      email: 'asdf@codefactory.ai',
      
    });

    const profile = await this.profileRepository.save({
      profileImg: 'asdkf.jpeg',
      user,

    })

    return user;
  }
}
