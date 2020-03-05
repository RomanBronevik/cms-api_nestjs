import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { Tag } from '../../entities/tag.entity';
import { TagService } from './tag.service';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permission.decorator';

@Controller('api/tag')
@UseGuards(PermissionsGuard)
export class TagController {

  constructor(private service: TagService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @Permissions('getTags')
  getTags() {    
    try {
      return this.service.getTags();
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @Permissions('getTag')
  getTag(@Param() params) {    
    try {
      return this.service.getTag(params.id);
    } catch (error) {
      return error.message;
    }
  }  

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @Permissions('createTag')
  createTag(@Body() tag: Tag) {
    try {
      return this.service.createTag(tag);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  @Permissions('updateTag')
  updateTag(@Body() tag: Tag) {
    try {
      return this.service.updateTag(tag);
    } catch (error) {
      return error.message;
    }
  }
  
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @Permissions('deleteTag')
  deleteTag(@Param() params) {
    try {
      return this.service.deleteTag(params);
    } catch (error) {
      return error.message;
    }
  }

}