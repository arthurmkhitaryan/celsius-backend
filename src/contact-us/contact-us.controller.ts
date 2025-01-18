import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { ContactUsEntity } from './entity/contact-us.entity';
import { CreateContactUsDto } from './dto/createContactUs.dto';

@Controller('contacts')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Post()
  create(
    @Body(ValidationPipe) dto: CreateContactUsDto,
  ): Promise<ContactUsEntity> {
    return this.contactUsService.create(dto);
  }
}
