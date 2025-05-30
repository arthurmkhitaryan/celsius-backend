// src/product/product.service.ts
import { Injectable } from '@nestjs/common';
import { StrapiService } from '../strapi/strapi.service';
import { MailerService } from 'mailer/mailer.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CareerService {
  constructor(
    private readonly strapiService: StrapiService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async create(file: any, body: any): Promise<void> {
    // Combine file and form data into the email
    const emailBody = `
      Name: ${body.name}
      Surname: ${body.surname}
      Email: ${body.email}
      Phone: ${body.phone}
      Position: ${body.position}
      Other Information: ${body.otherInfo}
    `;

    await this.mailerService.sendMail(
      this.configService.getOrThrow<string>('EMAIL_FROM'),
      'New Career Application',
      emailBody,
      {
        filename: file.originalname,
        content: file.buffer,
        contentType: file.mimetype,
      },
    );
  }

  async findAll(): Promise<any[]> {
    return this.strapiService.getEntries('careers');
  }

  async findOne(id: number): Promise<any> {
    return this.strapiService.getEntry('careers', id.toString());
  }

  async sendCv(file: any): Promise<void> {
    await this.mailerService.sendMail(
      'celsiusllc21@gmail.com',
      'CV',
      'Please find the attached CV.',
      {
        filename: file.originalname,
        content: file.buffer,
        contentType: file.mimetype,
      },
    );
  }
}
