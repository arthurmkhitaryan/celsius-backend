import { Injectable } from '@nestjs/common';
import { PartnerEntity } from './entity/partner.entity';
import { StrapiService } from '../strapi/strapi.service';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '../mailer/mailer.service';
import { CreatePartnerDto } from './dto/createPartner.dto';

@Injectable()
export class PartnerService {
  private readonly strapiUrl = this.configService.get<string>('STRAPI_URL');
  constructor(
    private readonly strapiService: StrapiService,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  findAll(): Promise<PartnerEntity[]> {
    return this.strapiService.getEntries('partners');
  }

  findOne(id: number): Promise<PartnerEntity | null> {
    return this.strapiService.getEntry('partners', id.toString());
  }

  async create(partner: CreatePartnerDto): Promise<PartnerEntity> {
    const partnerData = await this.strapiService.createEntry(
      'partners',
      partner,
    );

    await this.mailerService.sendMail(
      partner.email,
      'Celsius',
      'Thank you. We will respond as soon as possible. Become a Partner' +
        ' ' +
        partner.email,
    );

    return partnerData;
  }
}
