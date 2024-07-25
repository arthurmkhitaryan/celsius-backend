// src/product/product.service.ts
import { Injectable } from '@nestjs/common';
import { StrapiService } from '../strapi/strapi.service';

@Injectable()
export class CareerService {
  constructor(private readonly strapiService: StrapiService) {}

  async findAll(): Promise<any[]> {
    return this.strapiService.getEntries('careers');
  }

  async findOne(id: number): Promise<any> {
    return this.strapiService.getEntry('careers', id.toString());
  }
}
