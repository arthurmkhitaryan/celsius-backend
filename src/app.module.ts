import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';
import { StrapiService } from 'strapi/strapi.service';
import { StrapiModule } from 'strapi/strapi.module';
import { HttpModule } from '@nestjs/axios';
import { CategoryModule } from './category/category.module';
import { CareerModule } from 'career/career.module';
import { ContactUsModule } from './contact-us/contact-us.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    StrapiModule,
    HttpModule,
    CategoryModule,
    CategoryModule,
    CareerModule,
    ContactUsModule,
    MailerModule,
  ],
  providers: [StrapiService],
})
export class AppModule {}
