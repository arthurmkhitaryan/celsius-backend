import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { AttachmentInterface } from './types/attachment.interface';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.getOrThrow<string>('EMAIL_FROM'),
        pass: this.configService.getOrThrow<string>('EMAIL_PASSWORD'),
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    text: string,
    attachment?: AttachmentInterface,
  ) {
    const mailOptions = {
      to,
      subject,
      text,
    };

    await this.transporter.sendMail({
      ...mailOptions,
      attachments: attachment ? [attachment] : [],
    });
  }
}
