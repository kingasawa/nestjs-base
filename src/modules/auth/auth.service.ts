import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(payload): Promise<any> {
    const { username, password } = payload;
    const user = await this.userService.findOne({
      where: {
        email: username,
        delete_flg: 0,
      },
    });
    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('password 1', password);
    console.log('password 2', user.password);
    console.log('passwordMatch', passwordMatch);
    if (passwordMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    if (!user) return null;
    const payload = { email: user.email };
    const signToken = this.jwtService.sign(payload);
    return {
      login: true,
      accessToken: signToken,
      refreshToken: signToken,
    };
  }
}
