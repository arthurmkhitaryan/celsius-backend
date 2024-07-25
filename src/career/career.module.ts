import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StrapiModule } from 'strapi/strapi.module';
import { CareerController } from './career.controller';
import { Career } from './entity/Career.entity';
import { CareerService } from './career.service';

@Module({
  imports: [TypeOrmModule.forFeature([Career]), StrapiModule],
  controllers: [CareerController],
  providers: [CareerService],
  exports: [CareerService],
})
export class CareerModule {}
