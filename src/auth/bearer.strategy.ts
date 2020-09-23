import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(apiToken: string, done: Function): Promise<any> {
    const user = await this.authService.validate(apiToken);
    if (!user) {
      // requester is not authorized
      return done(null, false);
    }
    // // requester is authorized, return user object
    return done(null, user);
  }
}
