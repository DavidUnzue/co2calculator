import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { PlacesModule } from '../src/places/places.module';
import { PlacesService } from '../src/places/places.service';
import { INestApplication } from '@nestjs/common';
import { places } from '../src/mocks/data.mock';

describe('Cats', () => {
  let app: INestApplication;
  let placesService = { findAll: () => [...places] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PlacesModule],
    })
      .overrideProvider(PlacesService)
      .useValue(placesService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET places`, () => {
    return request(app.getHttpServer())
      .get('/places')
      .expect(200)
      .expect(placesService.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});
