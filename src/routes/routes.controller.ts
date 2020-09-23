import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiQuery,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RoutesService } from './routes.service';
import { Route } from './entities/route.entity';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';

@ApiTags('routes')
@ApiBearerAuth()
@UseGuards(BearerAuthGuard)
@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @ApiQuery({
    name: 'origin',
    type: String,
    required: true,
    description: 'IATA code of origin place',
  })
  @ApiQuery({
    name: 'destination',
    type: String,
    required: true,
    description: 'IATA code of destination place',
  })
  @ApiOkResponse({
    description: 'Retrieved routes by origin and destination successfully',
    type: Route,
  })
  @ApiBadRequestResponse({
    description: 'Wrong or incomplete query parameters submited',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized request',
  })
  @Get()
  async getRoutes(
    @Query() query: { origin: string; destination: string },
  ): Promise<Route[]> {
    const routes = await this.routesService.getRoutes(query);
    return routes;
  }
}
