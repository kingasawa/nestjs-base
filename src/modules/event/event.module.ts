import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './event.controller';
import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import EventEntity from '@modules/database/entities/event.entity';
import UserEntity from '@modules/database/entities/user.entity';
import ClubEntity from '@modules/database/entities/club.entity';
import { AbilityModule } from '@modules/ability/ability.module';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity, UserEntity, ClubEntity]), AbilityModule],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
