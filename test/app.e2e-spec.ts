import { Test, TestingModule } from '@nestjs/testing';
import { expect, describe, beforeEach, it } from '@jest/globals';
import { INestApplication } from '@nestjs/common';
import request from "supertest";
import { AppModule } from "../src/app.module";

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/user/me').expect(200).expect('Hello World!');
  });
});
