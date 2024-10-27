import { Controller, Get, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @Post('send-cv')
  @UseInterceptors(FileInterceptor('attachment'))
  create(
    @UploadedFile() file: Express.Multer.File
  ): Promise<void> {
    console.log(1233, file);
    return this.careerService.sendCv(file);
  }
}
