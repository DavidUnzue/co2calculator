import { HttpException, Injectable } from '@nestjs/common';
import fetch, { RequestInit } from 'node-fetch';
import config from '../config';

@Injectable()
export class GoClimateService {
  private url: URL;
  private headers: {};
  private defaultOptions: {};

  constructor() {
    this.url = new URL(`${config.goclimate_api_root}`);
    // send goclimate API Key for authentication as Basic Auth header
    const auth = Buffer.from(config.goclimate_api_key + ':', 'utf-8');
    this.headers = {
      Authorization: `Basic ${auth.toString('base64')}`,
    };
    this.defaultOptions = {
      headers: this.headers,
      redirect: 'follow',
    };
  }

  async getFootprint(
    {
      origin,
      destination,
      cabin_class = 'economy',
      currency = 'EUR',
    }: {
      origin: string;
      destination: string;
      cabin_class?: string;
      currency?: string;
    },
    options?: RequestInit,
  ) {
    this.url.searchParams.append('segments[0][origin]', origin);
    this.url.searchParams.append('segments[0][destination]', destination);
    this.url.searchParams.append('cabin_class', cabin_class);
    this.url.searchParams.append('currencies[]', currency);

    try {
      const response = await fetch(this.url, {
        ...this.defaultOptions,
        ...options,
      });
      if (!response.ok) {
        throw new HttpException('Bad request', response.status);
      }
      return response.json();
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }
}
