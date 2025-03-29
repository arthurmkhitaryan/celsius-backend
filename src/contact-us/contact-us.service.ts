import { Injectable } from '@nestjs/common';
import { ContactUsEntity } from './entity/contact-us.entity';
import { StrapiService } from '../strapi/strapi.service';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '../mailer/mailer.service';
import { CreateContactUsDto } from './dto/createContactUs.dto';

@Injectable()
export class ContactUsService {
  private readonly strapiUrl = this.configService.get<string>('STRAPI_URL');
  constructor(
    private readonly strapiService: StrapiService,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  findAll(): Promise<ContactUsEntity[]> {
    return this.strapiService.getEntries('contacts');
  }

  findOne(id: number): Promise<ContactUsEntity | null> {
    return this.strapiService.getEntry('contacts', id.toString());
  }

  async create(contactUs: CreateContactUsDto): Promise<ContactUsEntity> {
    const contactUsData = await this.strapiService.createEntry(
      'contacts',
      contactUs,
    );

    await this.mailerService.sendMail(
      contactUs.email,
      'Celsius',
      'Thank you. We will respond as soon as possible. Contact Us',
    );

    await this.mailerService.sendMail(
      'celsiusllc21@gmail.com',
      'Celsius Contact Us',
      `You have a message from this email ${contactUs.email} please check admin panel contact us section`
    );

    return contactUsData;
  }
}
