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
    return this.strapiService.getEntries('contact-uses');
  }

  findOne(id: number): Promise<ContactUsEntity | null> {
    return this.strapiService.getEntry('contact-uses', id.toString());
  }

  async create(contactUs: CreateContactUsDto): Promise<ContactUsEntity> {
    const contactUsData = await this.strapiService.createEntry(
      'contact-uses',
      contactUs,
    );

    await this.mailerService.sendMail(
      contactUs.email,
      'Celsius',
      'Thank you. We will respond as soon as possible.',
    );

    return contactUsData;
  }
}
