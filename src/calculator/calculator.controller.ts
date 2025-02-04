import { Body, Controller, Post } from '@nestjs/common';
import { CalculatorService } from './calculator.service';
import { CalculatorEntity } from './calculator.entity';

@Controller('calculator')
export class CalculatorController {
  constructor(private readonly service: CalculatorService) {}

  @Post('create')
  create(@Body() dto: CalculatorEntity) {
    return this.service.create(dto);
  }
}
