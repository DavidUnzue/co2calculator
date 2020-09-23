import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { RoutesService } from './routes.service';
import { Route } from './entities/route.entity';

@ApiTags('routes')
@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @ApiQuery({
    name: 'origin',
    type: String,
    required: false,
    description: 'IATA code of origin place',
  })
  @ApiQuery({
    name: 'destination',
    type: String,
    required: false,
    description: 'IATA code of destination place',
  })
  @Get()
  async getRoutes(
    @Query() query: { origin: string; destination: string },
  ): Promise<Route[]> {
    const routes = await this.routesService.getRoutes(query);
    return routes;
  }
}
