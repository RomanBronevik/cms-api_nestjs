import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService    
    
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('/stats')
  getStats() {
    try {
      return this.appService.getStats();
    } catch (error) {
      return error.message;
    }
  }
    
}
