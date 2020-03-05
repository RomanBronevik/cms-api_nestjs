import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { LocationService } from './location.service';

@Controller('api/location')
@UseGuards(PermissionsGuard)
export class LocationController {

  constructor(private service: LocationService,
  ) { }
  
  // @UseGuards(AuthGuard('jwt'))
  @Get('province')
  // @Permissions('getProvinces')
  getProvinces() {
    return this.service.getProvinces();
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get('district/:provinceId')
  // @Permissions('getProvinces')
  getDistricts(@Param() param) {
    return this.service.getDistricts(param.provinceId);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get('ward/:districtId')
  // @Permissions('getProvinces')
  getWards(@Param() param) {
    return this.service.getWards(param.districtId);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get('village/:wardId')
  // @Permissions('getProvinces')
  getVillages(@Param() param) {
    return this.service.getVillages(param.wardId);
  }
  
}