import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@shared/base/base.service';
import { InsertResult, Repository } from 'typeorm';
import { DELETE_MODE } from '@shared/common/constants';
import ClubEntity from '@modules/database/entities/club.entity';
import UserEntity from '@modules/database/entities/user.entity';
import EventEntity from '@modules/database/entities/event.entity';

@Injectable()
export class ClubService extends BaseService<ClubEntity> {
  constructor(
    @InjectRepository(ClubEntity) private readonly clubRepository: Repository<ClubEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(EventEntity) private readonly eventRepository: Repository<EventEntity>,
  ) {
    super({
      repository: [clubRepository],
      deleteMode: DELETE_MODE.Hard,
    });
  }

  private async findUserInClub(club: ClubEntity, userId: number): Promise<boolean> {
    const userExistingInClub: UserEntity[] = club.users.filter((member: UserEntity) => {
      return member.id === userId;
    });
    return userExistingInClub.length > 0;
  }

  public async fetchAll(): Promise<ClubEntity[]> {
    return await this.clubRepository.find({
      relations: ['users', 'events'],
    });
  }

  public async create(payload: ClubEntity): Promise<any> {
    try {
      const result: InsertResult = await this.clubRepository.insert(payload);
      await this.clubRepository.save(payload);
      return result['generatedMaps'];
    } catch (error) {
      return {
        error: true,
        response: error.response,
      };
    }
  }

  public async addMember(clubId: number, email: string): Promise<any> {
    try {
      const user: UserEntity = await this.userRepository.findOne({ email });
      const club: ClubEntity = await this.clubRepository.findOne({
        relations: ['users'],
        where: {
          id: clubId,
        },
      });
      if (!user || !club) throw new NotFoundException();

      const findUserInClub: boolean = await this.findUserInClub(club, user.id);
      if (findUserInClub) throw new BadRequestException();

      club.users.push(user);
      return await this.clubRepository.save(club);
    } catch (error: any) {
      return {
        error: true,
        response: error.response,
      };
    }
  }

  public async deleteMember(clubId, email: string): Promise<any> {
    try {
      const user: UserEntity = await this.userRepository.findOne({ email });
      const club: ClubEntity = await this.clubRepository.findOne({
        relations: ['users'],
        where: {
          id: clubId,
        },
      });
      club.users = club.users.filter((member) => {
        return member.id !== user.id;
      });
      return await this.clubRepository.save(club);
    } catch (error: any) {
      return {
        error: true,
        response: error.response,
      };
    }
  }

  public async addEvent(clubId, event: EventEntity): Promise<any> {
    try {
      const club: ClubEntity = await this.clubRepository.findOne({
        relations: ['events'],
        where: {
          id: clubId,
        },
      });
      if (!club) {
        throw new NotFoundException();
      }
      club.events.push(event);
      return await this.clubRepository.save(club);
    } catch (error) {
      return {
        error: true,
        response: error.response,
      };
    }
  }
}
