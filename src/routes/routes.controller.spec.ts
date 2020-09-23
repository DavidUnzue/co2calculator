import { Test, TestingModule } from '@nestjs/testing';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';
import { GoClimateService } from './goClimate.service';
import { GoClimateServiceMock } from '../mocks/goClimate.mock';

describe('RoutesController', () => {
  let routesController: RoutesController;
  let routesService: RoutesService;

  beforeEach(async () => {
    const GoClimateServiceProvider = {
      provide: GoClimateService,
      useClass: GoClimateServiceMock,
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RoutesController],
      providers: [RoutesService, GoClimateServiceProvider],
    }).compile();

    routesController = app.get<RoutesController>(RoutesController);
    routesService = app.get<RoutesService>(RoutesService);
  });

  it('should be defined', () => {
    expect(routesController).toBeDefined();
  });

  describe('getRoutes', () => {
    it('should return an array of routes based on filter params', async () => {
      const query = {
        origin: 'FRA',
        destination: 'MUC',
      };
      const result = [
        {
          origin: 'FRA',
          destination: 'MUC',
          vehicle: 'car',
          footprint: 57,
        },
        {
          origin: 'FRA',
          destination: 'MUC',
          vehicle: 'train',
          footprint: 12,
        },
        {
          origin: 'FRA',
          destination: 'MUC',
          vehicle: 'plane',
          footprint: 200,
        },
      ];

      jest.spyOn(routesService, 'getRoutes').mockResolvedValue(result);

      expect(await routesController.getRoutes(query)).toEqual(result);
    });
  });
});
