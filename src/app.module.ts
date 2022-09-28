import { LOCALES } from '@shared/common/constants';
import { UserModule } from '@modules/user/user.module';
import { CategoryModule } from '@modules/category/category.module';
import { ProductModule } from '@modules/product/product.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/database/db.module';
import { AuthModule } from '@modules/auth/auth.module';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
import { join } from 'path';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { CamelCaseNamingConvention, SnakeCaseNamingConvention } from '@automapper/core';
import { AppController } from './app.controller';
import { MailModule } from '@modules/mailer/mail.module';
import { ErrorModule } from '@modules/error/error.module';
import { AbilityModule } from '@modules/ability/ability.module';
import { LoggerService } from '@modules/logger/logger.service';
import { LoggerModule } from '@modules/logger/logger.module';
import { GoogleStrategy } from '@modules/auth/google.strategy';
import { ClubModule } from '@modules/club/club.module';
import { EventModule } from '@modules/event/event.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    CategoryModule,
    ClubModule,
    EventModule,
    ProductModule,
    AuthModule,
    I18nModule.forRoot({
      fallbackLanguage: LOCALES.English,
      parser: I18nJsonParser,
      parserOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
    AutomapperModule.forRoot({
      options: [
        {
          name: 'classMapper',
          pluginInitializer: classes,
          namingConventions: {
            source: new CamelCaseNamingConvention(),
            destination: new SnakeCaseNamingConvention(),
          },
        },
      ],
    }),
    MailModule,
    ErrorModule,
    AbilityModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [LoggerService, GoogleStrategy],
})
export class AppModule {}
