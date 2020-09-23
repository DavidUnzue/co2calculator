import { Test } from '@nestjs/testing';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { places } from '../mocks/data.mock';

describe('PlacesController', () => {
  let placesController: PlacesController;
  let placesService: PlacesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PlacesController],
      providers: [PlacesService],
    }).compile();

    placesService = moduleRef.get<PlacesService>(PlacesService);
    placesController = moduleRef.get<PlacesController>(PlacesController);
  });

  it('should be defined', () => {
    expect(placesController).toBeDefined();
  });

  describe('getPlaces', () => {
    it('should return an array of places', async () => {
      const result = [...places];

      jest.spyOn(placesService, 'findAll').mockResolvedValue(result);

      expect(await placesController.getPlaces()).toEqual(result);
    });
  });

  describe('getPlace', () => {
    it('should return a single place', async () => {
      const result = places[0];

      jest.spyOn(placesService, 'findOne').mockResolvedValue(result);

      expect(await placesController.getPlace(places[0].id)).toEqual(result);
    });
  });
});
