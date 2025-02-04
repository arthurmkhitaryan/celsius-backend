import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CalculatorEntity } from './calculator.entity';
import { MailerService } from 'mailer/mailer.service';

@Injectable()
export class CalculatorService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  create(dto: CalculatorEntity) {
    const { area_function, email, name, phoneNumber, region } = dto;

    // Create a subject that highlights a new cost request
    const subject = `New Calculator Cost Request from ${name}`;

    // Create the email body with all the details provided by the user
    const text = `
  You have received a new cost calculation request from your calculator form.
  
  Details:
  - Name: ${name}
  - Email: ${email}
  - Phone Number: ${phoneNumber}
  - Region: ${region}
  - Area Function: ${area_function}
  
  Please review the request and follow up as necessary.
    `;

    return this.mailerService.sendMail(
      this.configService.getOrThrow<string>('EMAIL_FROM'),
      subject,
      text,
    );
  }
}
