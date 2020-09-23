import { Injectable } from '@nestjs/common';
import config from '../config';

@Injectable()
export class AuthService {
  async validate(apiToken: string): Promise<any> {
    return new Promise(resolve => {
      if (apiToken === config.auth_token) {
        // Passport expects a user object to be retuned if authorization succeded
        const user = { name: 'John Doe' };
        resolve(user);
      }
      resolve(null);
    });
  }
}
