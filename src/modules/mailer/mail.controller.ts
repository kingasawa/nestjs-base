// import { MailerService } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { Controller, Get, Post, Query, Request, Response } from '@nestjs/common';
// import { JwtAuthGuard } from "@core/guards/jwt-auth.guard";
// import { CheckAbilities } from "@modules/ability/abilities.decorator";
// import { AbilityFactory, Action } from "@modules/ability/ability.factory";
// import UserEntity from "@modules/database/entities/user.entity";
import { BaseController } from '@shared/base/base.controller';
// import { I18nService } from "nestjs-i18n";
// import { UserService } from "@modules/user/user.service";

@Controller('mailer')
export class MailController extends BaseController {
  constructor(private readonly mailService: MailService) {
    super({ mailService });
  }
  @Post('/')
  async index(@Query() query, @Request() req, @Response() res): Promise<any> {
    const { mail } = req.body;
    const sentResult = await this.mailService.sendVerificationMail(mail, 'abc');
    return res.json({ sentResult });
  }
}
