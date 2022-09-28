import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubController } from './club.controller';
import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import ClubEntity from '@modules/database/entities/club.entity';
import UserEntity from '@modules/database/entities/user.entity';
import { AbilityModule } from '@modules/ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClubEntity, UserEntity]), AbilityModule],
  controllers: [ClubController],
  providers: [ClubService],
  exports: [ClubService],
})
export class ClubModule {}
