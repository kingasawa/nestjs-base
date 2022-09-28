import { describe, beforeEach, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

describe('UserController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('registration', () => {
    it('should return my information ', async () => {
      return request(app.getHttpServer()).get('/user/test').expect(200).expect('Hello World');
    });
  });
});
