import { Controller, Get, Param, Query } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { Route } from './interfaces/route.interface';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Get()
  async getRoutes(@Query() query): Promise<Route[]> {
    if (Object.keys(query).length > 0) {
      return this.routesService.findByFilter(query);
    }
    return this.routesService.findAll();
  }

  @Get(':id')
  async getRoute(@Param('id') routeId: string): Promise<Route> {
    const route = await this.routesService.findOne(routeId);
    return route;
  }
}
