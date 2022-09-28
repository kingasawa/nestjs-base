import { MailService } from './mail.service';
import { Controller, Post, Query, Request, Response } from '@nestjs/common';
import { BaseController } from '@shared/base/base.controller';

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
