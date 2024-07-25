// src/product/product.service.ts
import { Injectable } from '@nestjs/common';
import { StrapiService } from '../strapi/strapi.service';
import { prepareRelationForStrapi } from 'lib/utils/prepareRelationForStrapi';

@Injectable()
export class CategoryService {
  constructor(private readonly strapiService: StrapiService) {}

  async create(createCategoryDto: any): Promise<any> {
    const preparedData = prepareRelationForStrapi({
      categories: {
        connect: createCategoryDto.categories,
      },
    });

    const productData = { ...createCategoryDto, ...preparedData };

    const strapiProduct = await this.strapiService.createEntry(
      'categories',
      productData,
    );

    return strapiProduct;
  }

  async findAll(): Promise<any[]> {
    return this.strapiService.getEntries('categories');
  }

  async findOne(id: number): Promise<any> {
    return this.strapiService.getEntry('categories', id.toString());
  }

  async update(id: number, updateCategoryDto: any): Promise<any> {
    return this.strapiService.updateEntry(
      'categories',
      id.toString(),
      updateCategoryDto,
    );
  }

  async remove(id: number): Promise<any> {
    return this.strapiService.deleteEntry('categories', id.toString());
  }
}
