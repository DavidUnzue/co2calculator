import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Route } from './interfaces/route.interface';
import { Footprint } from './interfaces/footprint.interface';
import { vehicles, routes } from '../mocks';
import goClimate from './goClimate';

const calculateFootprint = (distance: number, vehicle: string) => {
  const emissions = vehicles[vehicle].emissions || 0;
  return Math.round(distance * emissions);
};

@Injectable()
export class RoutesService {
  private readonly routes: Route[] = routes;
  private footprints: Footprint[] = [];

  findAll(): Promise<Route[]> {
    return new Promise(resolve => {
      resolve(this.routes);
    });
  }

  async findByFilter(query: {
    origin: string;
    destination: string;
  }): Promise<any> {
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

    // create footprints for eachof th routes
    const footprints: Footprint[] = selectedRoutes.map(route => {
      const { vehicle, distance } = route;
      return {
        origin,
        destination,
        vehicle,
        footprint: calculateFootprint(distance, vehicle),
      };
    });

    try {
      const goClimateData = await goClimate.get({ origin, destination });
      const flightFootprint = goClimateData.footprint || 0;
      footprints.push({
        origin,
        destination,
        vehicle: 'plane',
        footprint: flightFootprint,
      });
    } catch (e) {
      // could not reach goclimate API
      console.log(e);
    }

    return footprints;
  }

  findOne(routeId: string): Promise<Route> {
    return new Promise(resolve => {
      const route = this.routes.find(route => route.id === Number(routeId));
      if (!route) {
        throw new NotFoundException('Route does not exist');
      }
      resolve(route);
    });
  }
}
