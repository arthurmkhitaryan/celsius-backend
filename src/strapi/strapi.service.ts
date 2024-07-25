// src/strapi/strapi.service.ts
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StrapiService {
  private readonly strapiUrl =
    this.configService.get<string>('STRAPI_URL') || 'http://localhost:1337';
  private readonly apiToken =
    this.configService.get<string>('STRAPI_API_TOKEN');

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async createEntry(entity: string, data: any): Promise<any> {
    const url = `${this.strapiUrl}/api/${entity}`;
    const response = await firstValueFrom(
      this.httpService.post(
        url,
        { data },
        {
          headers: {
            Authorization: `Bearer ${this.apiToken}`,
          },
        },
      ),
    );
    return response.data;
  }

  async getEntries(entity: string): Promise<any[]> {
    const url = `${this.strapiUrl}/api/${entity}`;
    const response = await firstValueFrom(
      this.httpService.get(url, {
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
        },
      }),
    );
    return response.data;
  }

  async getEntry(entity: string, id: string): Promise<any> {
    const url = `${this.strapiUrl}/api/${entity}/${id}`;
    const response = await firstValueFrom(
      this.httpService.get(url, {
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
        },
      }),
    );
    return response.data;
  }

  async updateEntry(entity: string, id: string, data: any): Promise<any> {
    const url = `${this.strapiUrl}/api/${entity}/${id}`;
    const response = await firstValueFrom(
      this.httpService.put(
        url,
        { data },
        {
          headers: {
            Authorization: `Bearer ${this.apiToken}`,
          },
        },
      ),
    );
    return response.data;
  }

  async deleteEntry(entity: string, id: string): Promise<any> {
    const url = `${this.strapiUrl}/api/${entity}/${id}`;
    const response = await firstValueFrom(
      this.httpService.delete(url, {
        headers: {
          Authorization: `Bearer ${this.apiToken}`,
        },
      }),
    );
    return response.data;
  }
}
