import { Test, TestingModule } from '@nestjs/testing';
import { RoutesService } from './routes.service';
import { GoClimateService } from './goClimate.service';
import { GoClimateServiceMock } from '../mocks/goClimate.mock';

describe('RoutesService', () => {
  let routesService: RoutesService;

  beforeEach(async () => {
    const GoClimateServiceProvider = {
      provide: GoClimateService,
      useClass: GoClimateServiceMock,
    };
    const app: TestingModule = await Test.createTestingModule({
      providers: [RoutesService, GoClimateServiceProvider],
    }).compile();

    routesService = app.get<RoutesService>(RoutesService);
  });

  it('should be defined', () => {
    expect(routesService).toBeDefined();
  });

  describe('getFootprint', () => {
    it('should get plane footprint for selected route', async () => {
      const expectedFootprint = 200;
      const routes = await routesService.getRoutes({
        origin: 'FRA',
        destination: 'MUC',
      });

      expect(routes).toEqual(
        expect.arrayContaining([
          {
            origin: 'FRA',
            destination: 'MUC',
            vehicle: 'plane',
            footprint: 200,
          },
        ]),
      );
    });
  });
});
