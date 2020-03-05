import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { AuthGuard } from '@nestjs/passport';
import { Permission } from '../../entities/permission.entity';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permission.decorator';

@Controller('api/permission')
@UseGuards(PermissionsGuard)
export class PermissionController {

  constructor(private service: PermissionService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @Permissions('getPermissions')
  getPermissions() {
    try {
      return this.service.getPermissions();
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @Permissions('getPermission')
  getPermission(@Param() params) {
    try {
      return this.service.getPermission(params.id);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @Permissions('createPermission')
  createPermission(@Body() permission: Permission) {
    try {
      return this.service.createPermission(permission);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  @Permissions('updatePermission')
  updatePermission(@Body() permission: Permission) {
    try {
      return this.service.updatePermission(permission);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @Permissions('deletePermission')
  deletePermission(@Param() params) {
    try {
      return this.service.deletePermission(params.id);
    } catch (error) {
      return error.message;
    }
  }

}