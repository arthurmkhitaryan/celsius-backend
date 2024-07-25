// src/strapi/strapi.module.ts
import { Module } from '@nestjs/common';
import { StrapiService } from './strapi.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [StrapiService],
  exports: [StrapiService],
})
export class StrapiModule {}
