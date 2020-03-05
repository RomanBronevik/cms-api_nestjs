import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from '../../entities/client.entity';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permission.decorator';

@Controller('api/client')
@UseGuards(PermissionsGuard)
export class ClientController {

  constructor(private service: ClientService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  @Permissions('getClients')
  getClients() {
    try {
      return this.service.getClients();
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  @Permissions('getClient')
  getClient(@Param() params) {
    try {
      return this.service.getClient(params.id);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @Permissions('createClient')
  createClient(@Body() client: Client) {
    try {
      return this.service.createClient(client);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  @Permissions('updateClient')
  updateClient(@Body() client: Client) {
    try {
      return this.service.updateClient(client);
    } catch (error) {
      return error.message;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')  
  @Permissions('deleteClient')
  deleteClient(@Param() params) {
    try {
      return this.service.deleteClient(params.id);
    } catch (error) {
      return error.message;
    }
  }

}