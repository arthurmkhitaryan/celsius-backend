import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CareerService } from './career.service';

@Controller('careers')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Get()
  findAll(): Promise<any[]> {
    return this.careerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.careerService.findOne(id);
  }
}
