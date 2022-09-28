import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@shared/base/base.service';
import { Repository } from 'typeorm';
import { DELETE_MODE } from '@shared/common/constants';
import ClubEntity from '@modules/database/entities/club.entity';
import UserEntity from '@modules/database/entities/user.entity';

@Injectable()
export class ClubService extends BaseService<ClubEntity> {
  constructor(
    @InjectRepository(ClubEntity) private readonly clubRepository: Repository<ClubEntity>,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {
    super({
      repository: [clubRepository],
      deleteMode: DELETE_MODE.Hard,
    });
  }

  public async fetchAll(): Promise<any> {
    return await this.clubRepository.find({
      relations: ['users'],
    });
  }

  public async create(payload: ClubEntity): Promise<any> {
    try {
      const result = await this.clubRepository.insert(payload);
      await this.clubRepository.save(payload);
      return result;
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
      const club: ClubEntity = await this.clubRepository.findOne({
        relations: ['users'],
        where: {
          id: clubId,
        },
      });
      if (!user || !club) {
        throw new NotFoundException();
      }
      club.users.push(user);
      return await this.clubRepository.save(club);
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
    } catch (error) {
      return {
        error: true,
        response: error.response,
      };
    }
  }
}
