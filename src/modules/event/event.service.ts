import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@shared/base/base.service';
import { InsertResult, Repository } from 'typeorm';
import { DELETE_MODE } from '@shared/common/constants';
import EventEntity from '@modules/database/entities/event.entity';
import UserEntity from '@modules/database/entities/user.entity';
import ClubEntity from '@modules/database/entities/club.entity';

@Injectable()
export class EventService extends BaseService<EventEntity> {
  constructor(
    @InjectRepository(EventEntity) private readonly eventRepository: Repository<EventEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ClubEntity) private readonly clubRepository: Repository<ClubEntity>,
  ) {
    super({
      repository: [eventRepository],
      deleteMode: DELETE_MODE.Hard,
    });
  }

  public async fetchAll(): Promise<any> {
    return await this.eventRepository.find({
      relations: ['club'],
    });
  }

  public async create(payload: EventEntity): Promise<any> {
    try {
      const club: ClubEntity = await this.clubRepository.findOne({
        where: {
          id: payload.club,
        },
      });
      if (!club) throw new NotFoundException();
      const event: InsertResult = await this.eventRepository.insert(payload);
      return event['generatedMaps'];
    } catch (error) {
      return {
        error: true,
        response: error.response,
      };
    }
  }

  public async addMember(clubId, email: string): Promise<any> {
    try {
      const user: UserEntity = await this.userRepository.findOne({ email });
      const club: EventEntity = await this.eventRepository.findOne({
        relations: ['users'],
        where: {
          id: clubId,
        },
      });
      if (!user || !club) {
        throw new NotFoundException();
      }
      club.users.push(user);
      return await this.eventRepository.save(club);
    } catch (error) {
      return {
        error: true,
        response: error.response,
      };
    }
  }

  public async deleteMember(clubId, email: string): Promise<any> {
    try {
      const user: UserEntity = await this.userRepository.findOne({ email });
      const club: EventEntity = await this.eventRepository.findOne({
        relations: ['users'],
        where: {
          id: clubId,
        },
      });
      club.users = club.users.filter((member) => {
        return member.id !== user.id;
      });
      return await this.eventRepository.save(club);
    } catch (error) {
      return {
        error: true,
        response: error.response,
      };
    }
  }
}
