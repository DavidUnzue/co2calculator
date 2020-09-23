import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { PlacesService } from './places.service';
import { Place } from './entities/place.entity';

@ApiTags('places')
@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

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
  @Get(':id')
  async getPlace(@Param('id') placeId: string): Promise<Place> {
    const place = await this.placesService.findOne(placeId);
    return place;
  }
}
