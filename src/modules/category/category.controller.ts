import { BaseController } from '@shared/base/base.controller';
import { Controller, Get, Post, Request, Response } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { AbilityFactory } from '@modules/ability/ability.factory';
import { CategoryService } from '@modules/category/category.service';

@Controller('category')
export class CategoryController extends BaseController {
  constructor(
    public readonly i18n: I18nService,
    public abilityFactory: AbilityFactory,
    private readonly categoryService: CategoryService,
  ) {
    super({ abilityFactory, i18n });
  }

  @Get('/')
  async fetch(@Request() req, @Response() res): Promise<any> {
    const test = await this.categoryService.fetchAll();
    console.log('test', test);
    return res.json({ test });
  }

  @Post('/')
  async create(@Request() req, @Response() res): Promise<any> {
    // const { category, products } = req.body;
    const created = await this.categoryService.create(req.body);
    console.log('created', created);
    return res.json({ created });
  }
}
