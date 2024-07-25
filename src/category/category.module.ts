import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StrapiModule } from 'strapi/strapi.module';
import { Category } from './entity/Category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), StrapiModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
