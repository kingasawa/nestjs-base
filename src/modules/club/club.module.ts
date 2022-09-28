import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubController } from './club.controller';
import { Module } from '@nestjs/common';
import { ClubService } from './club.service';
import ClubEntity from '@modules/database/entities/club.entity';
import UserEntity from '@modules/database/entities/user.entity';
import EventEntity from '@modules/database/entities/event.entity';
import { AbilityModule } from '@modules/ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClubEntity, UserEntity, EventEntity]), AbilityModule],
  controllers: [ClubController],
  providers: [ClubService],
  exports: [ClubService],
})
export class ClubModule {}
