import { HttpException } from '@nestjs/common';
import fetch, { RequestInit } from 'node-fetch';

class Api {
  private url: URL;
  private headers: {};
  private defaultOptions: {};

  constructor() {
    this.url = new URL(`${process.env.GOCLIMATE_API_ROOT}`);
    // send goclimate API Key for authentication as Basic Auth header
    const auth = Buffer.from(process.env.GOCLIMATE_API_KEY + ':', 'utf-8');
    this.headers = {
      Authorization: `Basic ${auth.toString('base64')}`,
    };
    this.defaultOptions = {
      headers: this.headers,
      redirect: 'follow',
    };
  }

  async get(
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
      const json = await response.json();
      return json;
    } catch (e) {
      throw new HttpException(e, 400);
    }
  }
}

const api = new Api();
export default api;
