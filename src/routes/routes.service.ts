import { Injectable, BadRequestException } from '@nestjs/common';
import { Route } from './entities/route.entity';
import { vehicles, routes } from '../mocks/data.mock';
import { GoClimateService } from './goClimate.service';

const calculateFootprint = (distance: number, vehicle: string) => {
  const emissions = vehicles[vehicle].emissions || 0;
  return Math.round(distance * emissions);
};

@Injectable()
export class RoutesService {
  constructor(private readonly goClimate: GoClimateService) {}

  private readonly routes: Route[] = routes;

  async getRoutes(query: {
    origin: string;
    destination: string;
  }): Promise<Route[]> {
    // origin and destination required
    let { origin, destination } = query;
    if (!origin || !destination) {
      throw new BadRequestException('Wrong query params applied');
    }
    // allow for searching routes in both ways (origin and destination interchangable)
    const selectedRoutes = this.routes.filter(
      route =>
        (route.origin === origin && route.destination === destination) ||
        (route.origin === destination && route.destination === origin),
    );

    // append footprints to each of the routes
    const routes: Route[] = selectedRoutes.map(route => {
      const { vehicle, distance } = route;
      return {
        origin,
        destination,
        vehicle,
        footprint: calculateFootprint(distance, vehicle),
      };
    });

    // create the plane root and retrieve footprint from GoCLimate
    try {
      const goClimateData = await this.goClimate.getFootprint({
        origin,
        destination,
      });
      const flightFootprint = goClimateData.footprint || 0;
      routes.push({
        origin,
        destination,
        vehicle: 'plane',
        footprint: flightFootprint,
      });
    } catch (e) {
      // could not reach goclimate API
      // response will not fail, but it won't contain the footprint for the plane route
      console.log(e);
    }

    return routes;
  }
}
