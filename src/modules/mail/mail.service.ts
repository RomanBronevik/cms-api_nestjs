import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mail } from '../../entities/mail.entity';
var nodemailer = require('nodemailer');

@Injectable()
export class MailService {
    constructor(
        @InjectRepository(Mail) private mailRepository: Repository<Mail>,
    ) { }

    async sendMail(mail) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {                
                user: 'ngtiendat20@gmail.com',
                pass: 'feelthebeats'
            }
        });

        var mailOptions = {
            from: 'Nets Company',
            to: 'huynhthienphuc9775@gmail.com, admin@dotnets.org, hung.nguyen@dotnets.org, thuan.nguyen@dotnets.org, baotq610@gmail.com',
            subject: 'Phản hồi của khách hàng',
            html: `- Tên khách hàng: ${mail.name} <br /> - Email: ${mail.email} <br /> - Số điện thoại: ${mail.phone} <br /> - Tin nhắn: ${mail.message}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }

}
