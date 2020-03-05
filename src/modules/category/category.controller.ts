import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { Category } from '../../entities/category.entity';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permission.decorator';

@Controller('api/category')
@UseGuards(PermissionsGuard)
export class CategoryController {

  constructor(private service: CategoryService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @Permissions('getCategories')
  getCategories(@Req() request: Request) {
    const page = parseInt(request.query.page) || 0;
    const size = parseInt(request.query.size) || 10;
    const keyword = request.query.keyword;
    const sort = request.query.sort;
    const order = request.query.order;
    return this.service.getCategories(page, size, keyword, sort, order);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @Permissions('getCategory')
  getCategory(@Param() params) {
    try {
      return this.service.getCategory(params.id);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @Permissions('createCategory')
  createCategory(@Body() category: Category) {
    try {
      return this.service.createCategory(category);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  @Permissions('updateCategory')
  updateCategory(@Body() category: Category) {
    try {
      return this.service.updateCategory(category);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @Permissions('deleteCategory')
  deleteCategory(@Param() params: Category) {
    try {
      return this.service.deleteCategory(params);
    } catch (error) {
      return error.message;
    }
  }

}