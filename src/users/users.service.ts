import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { StrapiService } from 'strapi/strapi.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly strapiService: StrapiService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const strapiCustomer = await this.strapiService.createEntry('customers', {
      ...createUserDto,
      role: 'Customer',
    });

    return strapiCustomer;
  }

  async findOne(id: number): Promise<User | null> {
    return this.strapiService.getEntry('customers', `${id}`);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.strapiService.getEntryByEmail('customers', email);

    return user.attributes;
  }
}
