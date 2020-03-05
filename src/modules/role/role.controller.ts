import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { Role } from '../../entities/role.entity';
import { RoleService } from './role.service';
import { AuthGuard } from '@nestjs/passport';
import { Permissions } from '../../common/decorators/permission.decorator';
import { PermissionsGuard } from '../../common/guards/permissions.guard';

@UseGuards(PermissionsGuard)
@Controller('api/role')
export class RoleController {

  constructor(private service: RoleService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @Permissions('getRoles')
  getRoles() {
    try {
      return this.service.getRoles();
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @Permissions('getRole')
  getRole(@Param() params) {
    try {
      return this.service.getRole(params.id);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @Permissions('createRole')
  createRole(@Body() role: Role) {
    try {
      return this.service.createRole(role);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  @Permissions('updateRole')
  updateRole(@Body() role: Role) {
    try {
      return this.service.updateRole(role);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @Permissions('deleteRole')
  deleteRole(@Param() params) {
    try {
      return this.service.deleteRole(params.id);
    } catch (error) {
      return error.message;
    }
  }

}