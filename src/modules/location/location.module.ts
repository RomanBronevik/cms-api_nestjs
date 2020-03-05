import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from '../../entities/article.entity';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { Province } from '../../entities/province.entity';
import { District } from '../../entities/district.entity';
import { Ward } from '../../entities/ward.entity';
import { Village } from '../../entities/village.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    TypeOrmModule.forFeature([Province]),
    TypeOrmModule.forFeature([District]),
    TypeOrmModule.forFeature([Ward]),
    TypeOrmModule.forFeature([Village]),
  ],
  providers: [LocationService],
  controllers: [LocationController],
  exports: [LocationService],
})
export class LocationModule { }
