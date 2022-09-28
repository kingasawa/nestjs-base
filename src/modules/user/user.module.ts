import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MailService } from '../mailer/mail.service';
import { JwtModule } from '@nestjs/jwt';
import UserEntity from '@modules/database/entities/user.entity';
import { AbilityModule } from '@modules/ability/ability.module';
import { JWT_SECRET_KEY } from '@shared/common/constants';
import { JwtStrategy } from '@modules/auth/jwt.strategy';
import { AuthService } from '@modules/auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: JWT_SECRET_KEY,
    }),
    AbilityModule,
  ],
  controllers: [UserController],
  providers: [AuthService, UserService, JwtStrategy, MailService],
  exports: [AuthService, UserService, JwtStrategy, MailService],
})
export class UserModule {}
