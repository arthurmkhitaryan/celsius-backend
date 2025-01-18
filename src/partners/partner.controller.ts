import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { PartnerEntity } from './entity/partner.entity';
import { CreatePartnerDto } from './dto/createPartner.dto';

@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Post()
  create(@Body(ValidationPipe) dto: CreatePartnerDto): Promise<PartnerEntity> {
    console.log({ dto });
    return this.partnerService.create(dto);
  }
}
