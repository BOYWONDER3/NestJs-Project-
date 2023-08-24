import { Controller, Get, Post, Req, Res, Body, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';

@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    return [{ username: 'Isaac', email: 'isaac@isaac.com' }];
  }

  @Get('posts')
  getUsersPosts() {
    return [
      {
        username: 'Isaac',
        email: 'isaac@isaac.com',
        posts: [
          {
            id: 1,
            title: 'post 1',
          },
          {
            id: 2,
            post: 'post 2',
          },
        ],
      },
    ];
  }

  @Get('posts/comments')
  getUsersPostsComments() {
    return [
      {
        id: 1,
        title: 'post 1',
        comments: [],
      },
    ];
  }

  @Post('create')
  createUser(@Body() userData: CreateUserDto) {
    console.log(userData);
    return {};
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    console.log(id);
    return { id };
  }
}
