import { Controller, Post, Body, Get, Put, Delete, Param, UseGuards, Req, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('api/mail')
export class MailController {

  constructor(private service: MailService,
  ) { }

  @Post()
  sendMail(@Body() mail) {
    return this.service.sendMail(mail);
  }

}