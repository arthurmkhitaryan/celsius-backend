// src/strapi/strapi.service.ts
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    try {
      const url = `${this.strapiUrl}/api/${entity}`;

      const response = await firstValueFrom(
        this.httpService.post(
          url,
          { data },
          {
            headers: {
              Authorization: `Bearer ${this.apiToken}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          {
            status: error.response.status,
            error: error.response.data,
          },
          error.response.status,
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'An unexpected error occurred',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async getEntries(entity: string): Promise<any[]> {
    const url = `${this.strapiUrl}/api/${entity}?sort[0]=id`;
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

  async getEntryByEmail(entity: string, email: string): Promise<any> {
    try {
      const url = `${this.strapiUrl}/api/${entity}?filters[email][$eq]=${email}`;
      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `Bearer ${this.apiToken}`,
          },
        }),
      );
      return response.data.data[0];
    } catch (error) {
      throw new Error(`Error fetching entry by email: ${error.message}`);
    }
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
