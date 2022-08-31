import { BaseController } from '@shared/base/base.controller';
import { UseGuards, Controller, Post, Request, Response, Get, UseFilters, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '@core/guards/local-auth.guard';
import { LoginFailedExceptionFilter } from '@core/filters/login-failed-exception.filter';
import { I18nService } from 'nestjs-i18n';
import { DEFAULT_LANGUAGE } from '@shared/common/constants';
import { AuthGuard } from '@nestjs/passport';
// import { JwtAuthGuard } from "@core/guards/jwt-auth.guard";
// import { CheckAbilities } from "@modules/ability/abilities.decorator";
// import { Action } from "@modules/ability/ability.factory";
// import UserEntity from "@modules/database/entities/user.entity";

@Controller('auth')
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService, public readonly i18n: I18nService) {
    super({ i18n });
  }

  @UseGuards(LocalAuthGuard)
  @UseFilters(LoginFailedExceptionFilter)
  @Post('/login')
  async login(@Request() req, @Response() res) {
    try {
      req.user.remember = req.body.remember || false;
      req.user.lang = req.body.language || DEFAULT_LANGUAGE;
      const loginData = await this.authService.login(req.user);
      console.log("loginData", loginData);
      return res.json({ token: loginData });
    } catch (error) {
      return this.error(res, error?.message);
    }
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req, @Response() res) {
    return res.json({ test: 'abc' });
  }

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Request() req, @Response() res) {
    console.log('req.user', req.user);
    return res.json({ token: req.user });
  }

  @Get('/logout')
  async logout(@Request() req, @Response() res): Promise<any> {
    await req.logout();
    return res.redirect('/auth/login');
  }

  @Get('/check')
  // @UseGuards(JwtAuthGuard)
  // @CheckAbilities({ action: Action.Read, subject: UserEntity })
  async checkAuth(@Request() req, @Response() res): Promise<any> {
    const { headers } = req;
    console.log('authorization', headers.authorization);
    if (headers.authorization) {
      return res.json({ login: true });
    }
    return res.json({ login: false });
  }
}
