import { BaseController } from '@shared/base/base.controller';
import { Controller, UseGuards } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { ProductService } from './product.service';
// import { JwtAuthGuard } from '@core/guards/jwt-auth.guard';
import { AbilityFactory } from '@modules/ability/ability.factory';
// import UserEntity from '@modules/database/entities/user.entity';
// import { CheckAbilities } from '@modules/ability/abilities.decorator';
import { AuthenticatedGuard } from '@core/guards/authenticated.guard';

@Controller('user')
@UseGuards(AuthenticatedGuard)
export class ProductController extends BaseController {
  constructor(
    public readonly i18n: I18nService,
    private readonly userService: ProductService,
    public abilityFactory: AbilityFactory,
  ) {
    super({ abilityFactory, i18n });
  }
}
