import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CareerService } from './career.service';
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}
@Controller('careers')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Post()
  @UseInterceptors(FileInterceptor('cv'))
  createCV(
    @UploadedFile() file: MulterFile,
    @Body() userData: Record<string, any>,
  ): Promise<void> {
    return this.careerService.create(file, userData);
  }

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
  create(@UploadedFile() file: MulterFile): Promise<void> {
    return this.careerService.sendCv(file);
  }
}
