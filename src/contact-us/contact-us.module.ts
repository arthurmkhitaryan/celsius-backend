import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactUsService } from './contact-us.service';
import { ContactUsController } from './contact-us.controller';
import { ContactUsEntity } from './entity/contact-us.entity';
import { StrapiModule } from '../strapi/strapi.module';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactUsEntity]),
    StrapiModule,
    MailerModule,
  ],
  providers: [ContactUsService],
  controllers: [ContactUsController],
})
export class ContactUsModule {}
