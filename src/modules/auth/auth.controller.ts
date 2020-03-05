import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
@Controller('api/login')
export class AuthController {

  constructor(private authService: AuthService) { } 

  @UseGuards(AuthGuard('local'))
  @Post()
  async login(@Request() req) {
    try {
      return this.authService.login(req.user);
    } catch (error) {
      return error.message;
    }
  }
}