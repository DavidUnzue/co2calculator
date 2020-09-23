import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PlacesService } from './places.service';
import { Place } from './entities/place.entity';
import { BearerAuthGuard } from '../auth/bearer-auth.guard';

@ApiTags('places')
@ApiBearerAuth()
@UseGuards(BearerAuthGuard)
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @ApiOkResponse({
    description: 'Retrieved all places successfully',
    type: Place,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized request',
  })
  @Get()
  async getPlaces(): Promise<Place[]> {
    return this.placesService.findAll();
  }

  @ApiOkResponse({
    description: 'Retrieved place by ID successfully',
    type: Place,
  })
  @ApiNotFoundResponse({ description: 'No place found for ID' })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized request',
  })
  @Get(':id')
  async getPlace(@Param('id') placeId: string): Promise<Place> {
    const place = await this.placesService.findOne(placeId);
    return place;
  }
}
