import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Province } from '../../entities/province.entity';
import { District } from '../../entities/district.entity';
import { Ward } from '../../entities/ward.entity';
import { Village } from '../../entities/village.entity';


@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(Province) private provinceRepository: Repository<Province>,
        @InjectRepository(District) private districtRepository: Repository<District>,
        @InjectRepository(Ward) private wardRepository: Repository<Ward>,
        @InjectRepository(Village) private villageRepository: Repository<Village>,
    ) { }

    async getProvinces(){
        return this.provinceRepository.find();
    }

    async getDistricts(provinceId: string){
        return this.districtRepository.find({ provinceId });
    }
    
    async getWards(districtId: string){
        return this.wardRepository.find({ districtId });
    }

    async getVillages(wardId: string){
        return this.villageRepository.find({ wardId });
    }

}
