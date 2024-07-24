import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entity/product.entity';
import { CreateProductDto } from './dto/createProduct.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Product | null> {
    return this.productsService.findOne(id);
  }

  @Post()
  create(
    @Body(ValidationPipe) createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body(ValidationPipe) createProductDto: CreateProductDto,
  ): Promise<Product | null> {
    return this.productsService.update(id, createProductDto);
  }

  @Delete()
  remove(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    ids: number[],
  ): Promise<void> {
    return this.productsService.remove(ids);
  }
}
