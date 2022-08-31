import UserEntity from '@modules/database/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '@shared/base/base.service';
import { Repository } from 'typeorm';
import { createUserData } from './user.type';
import { DELETE_MODE } from '@shared/common/constants';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'modules/mailer/mail.service';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {
    super({
      repository: userRepository,
      deleteMode: DELETE_MODE.Hard,
    });
  }

  public async fetchAllUser(payload = {}): Promise<any> {
    // const condition = {};
    // const searchOptions = {
    //   where: condition,
    // };

    const users = [];
    // const users: any = await this.userRepository.find(searchOptions);
    console.log('users', users);
    return users;
  }

  public async verifyUser(email: string, code: string): Promise<any> {
    const activeResult = {
      error: true,
      data: {},
      message: '',
    };

    const registerToken = code;
    const user: UserEntity = await this.userRepository.findOne({
      where: {
        email,
        registerToken,
      },
    });
    if (!user) {
      return activeResult;
    }
    delete user.password;
    user.active = 1;
    const active = await this.userRepository.update(user.id, user);
    activeResult.error = false;
    if (active) return activeResult;
    return activeResult;
  }

  public async register(payload: createUserData): Promise<any> {
    if (payload.email.split('@')[1] !== 'icd-vn.com') {
      return {
        error: true,
        data: {},
        message: 'Email is not allowed to join',
      };
    }
    const registerToken: string = (Math.random() + 1).toString(36).substring(2);
    const checkExisting = await this.findOne({ email: payload.email });
    if (checkExisting) {
      return {
        error: true,
        data: {},
        message: 'Data existed',
      };
    }

    payload.registerToken = registerToken;
    const UserEntity: UserEntity = this.userRepository.create(payload);

    await this.userRepository.save(UserEntity);
    await this.mailService.sendVerificationMail(payload.email, registerToken);

    return {
      error: false,
      data: UserEntity,
      message: 'Success',
    };
  }
}
