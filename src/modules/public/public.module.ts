import { Module } from '@nestjs/common';
import { PublicService } from './public.service';
import { PublicController } from './public.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '../../entities/client.entity';
import { Category } from '../../entities/category.entity';
import { User } from '../../entities/user.entity';
import { Role } from '../../entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    TypeOrmModule.forFeature([Category]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Role]),
  ],
  providers: [PublicService],
  controllers: [PublicController],
  exports: [PublicService],
})
export class PublicModule { }
