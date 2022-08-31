import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { config } from 'dotenv';
import { JwtService } from '@nestjs/jwt';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private jwtService: JwtService) {
    super({
      clientID: '1025761484557-p5uub2krpre3k3iehn1gvp1m3eovhokr.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }
  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { emails } = profile;
    const payload = {
      email: emails[0].value,
      accessToken,
    };
    const signToken = this.jwtService.sign(payload);
    done(null, {
      login: true,
      accessToken: signToken,
      refreshToken: signToken,
    });
  }
}
