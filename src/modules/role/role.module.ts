import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../../entities/role.entity';
import { Permission } from '../../entities/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),    
    TypeOrmModule.forFeature([Permission]),
  ],
  providers: [RoleService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
