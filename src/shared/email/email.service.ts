import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, subject: string,) {
    try {
        console.log("llega")
        const send = await this.mailerService.sendMail({
          to,
          subject,
        });
        console.log(send)
        
    } catch (error) {
        console.log(error)
    }
  }
}
