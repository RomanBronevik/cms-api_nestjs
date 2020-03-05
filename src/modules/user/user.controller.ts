import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permission.decorator';
import { Request } from 'express';
import { Transaction, TransactionRepository, Repository } from 'typeorm';

@Controller('api/user')
@UseGuards(PermissionsGuard)
export class UserController {
  constructor(private service: UserService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  getCurrentUser(@Req() req) {
    return this.service.getCurrentUser(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @Permissions('getUsers')
  getUsers(@Req() request: Request) {
    try {
      const keyword = request.query.keyword;
      const sort = request.query.sort;
      const order = request.query.order;
      const idOfClient = request.query.idOfClient;
      return this.service.getUsers(keyword, sort, order, idOfClient);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @Permissions('getUser')
  getUser(@Param() params: any) {
    try {
      return this.service.getUser(params.id);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @Permissions('createUser')
  createUser(@Body() user: User) {
    try {
      return this.service.createUser(user);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  @Permissions('updateUser')
  updateUser(@Body() user: User) {
    try {
      return this.service.updateUser(user);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @Permissions('deleteUser')
  deleteUser(@Param() params: any) {
    try {
      return this.service.deleteUser(params.id);
    } catch (error) {
      return error.message;
    }
  }

}