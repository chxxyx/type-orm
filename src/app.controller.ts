import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throwIfEmpty } from 'rxjs';
import { Repository } from 'typeorm';
import { AppService } from './app.service';
import { PostModel } from './entity/post.entity';
import { ProfileModel } from './entity/profile.entity';
import { TagModel } from './entity/tag.entity';
import { UserModel, Role } from './entity/user.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel)
    private readonly tagRepository: Repository<TagModel>,

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
        posts: true
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

  @Post('user/post')
  async createUserAndPosts() {
    const user = await this.userRepository.save({
      email: 'postUser@codefactory.ai',
    })

    await this.postRepository.save({
      title: 'post1',
      author: user
    });

    await this.postRepository.save({
      title: 'post 2',
      author: user
    })

    return user;
  }

  @Post('posts/tags')
  async createPostsTags() {
    const post1 = await this.postRepository.save({
      title: 'NestJS Lecture'
    });
    const post2 = await this.postRepository.save({
      title: 'Programming'
    });

    // 태그에 글 넣기
    const tag1 = await this.tagRepository.save({
      name: 'JS',
      posts: [post2]
    });

    const tag2 = await this.tagRepository.save({
      name: 'TS',
      posts: [post1, post2]
    })

    // 글에 태그 넣기
    const post3 = await this.postRepository.save({
      title: 'Next.JS Study',
      tags: [tag2]
    });

    return true;
  }

  @Get('posts')
  getPosts() {
    return this.postRepository.find({
      relations: {
        tags: true,
      }
    })
  }

  @Get('tags')
  getTags() {
    return this.tagRepository.find({
      relations: {
        posts: true,
      }
    })
  }

}
