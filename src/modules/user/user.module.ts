import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MailService } from '../mailer/mail.service';
import { JwtService } from '@nestjs/jwt';
import UserEntity from '@modules/database/entities/user.entity';
import { AbilityModule } from '@modules/ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), AbilityModule],
  controllers: [UserController],
  providers: [UserService, JwtService, MailService],
  exports: [UserService],
})
export class UserModule {}
