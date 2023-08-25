import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Body,
  Param,
  Query,
  ValidationPipe,
  UsePipes,
  ParseIntPipe,
  ParseBoolPipe,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { AuthGuard } from 'src/users/guards/auth/auth.guard';
import { ValidateCreateUserPipe } from 'src/users/pipe/validate-create-user/validate-create-user.pipe';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard)
  getUsers() {
    return this.userService.fetchUsers();
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
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    console.log(userData.age.toPrecision());
    return this.userService.createUser(userData);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.fetchUserById(id);
    if (!user)
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    return user;
  }
}
