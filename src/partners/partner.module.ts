import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerService } from './partner.service';
import { PartnerController } from './partner.controller';
import { PartnerEntity } from './entity/partner.entity';
import { StrapiModule } from '../strapi/strapi.module';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PartnerEntity]),
    StrapiModule,
    MailerModule,
  ],
  providers: [PartnerService],
  controllers: [PartnerController],
})
export class PartnerModule {}
