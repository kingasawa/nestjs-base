import { BaseController } from '@shared/base/base.controller';
import { Controller, Get, Post, Delete, Request, Response } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { AbilityFactory } from '@modules/ability/ability.factory';
import { EventService } from '@modules/event/event.service';

@Controller('event')
export class EventController extends BaseController {
  constructor(
    public readonly i18n: I18nService,
    public abilityFactory: AbilityFactory,
    private readonly eventService: EventService,
  ) {
    super({ abilityFactory, i18n });
  }

  @Get('/')
  async fetch(@Request() req, @Response() res): Promise<any> {
    const events = await this.eventService.fetchAll();
    console.log('events', events);
    return res.json({ events });
  }

  @Post('/')
  async create(@Request() req, @Response() res): Promise<any> {
    // const { category, products } = req.body;
    const created = await this.eventService.create(req.body);
    console.log('created', created);
    return res.json({ created });
  }

  @Post('/member')
  async addMembers(@Request() req, @Response() res): Promise<any> {
    const { eventId, email } = req.body;
    const added = await this.eventService.addMember(eventId, email);
    console.log('added', added);
    return res.json({ added });
  }

  @Delete('/member')
  async deleteMembers(@Request() req, @Response() res): Promise<any> {
    const { eventId, email } = req.body;
    const deleted = await this.eventService.deleteMember(eventId, email);
    console.log('deleted', deleted);
    return res.json({ deleted });
  }
}
