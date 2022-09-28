import { BaseController } from '@shared/base/base.controller';
import { Controller, Get, Post, Delete, Request, Response } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { AbilityFactory } from '@modules/ability/ability.factory';
import { ClubService } from '@modules/club/club.service';

@Controller('club')
export class ClubController extends BaseController {
  constructor(
    public readonly i18n: I18nService,
    public abilityFactory: AbilityFactory,
    private readonly clubService: ClubService,
  ) {
    super({ abilityFactory, i18n });
  }

  @Get('/')
  async fetch(@Request() req, @Response() res): Promise<any> {
    const clubs = await this.clubService.fetchAll();
    console.log('clubs', clubs);
    return res.json({ clubs });
  }

  @Post('/')
  async create(@Request() req, @Response() res): Promise<any> {
    // const { category, products } = req.body;
    const created = await this.clubService.create(req.body);
    console.log('created', created);
    return res.json({ created });
  }

  @Post('/member')
  async addMembers(@Request() req, @Response() res): Promise<any> {
    const { clubId, email } = req.body;
    const added = await this.clubService.addMember(clubId, email);
    console.log('added', added);
    return res.json({ added });
  }

  @Delete('/member')
  async deleteMembers(@Request() req, @Response() res): Promise<any> {
    const { clubId, email } = req.body;
    const deleted = await this.clubService.deleteMember(clubId, email);
    console.log('deleted', deleted);
    return res.json({ deleted });
  }
}
