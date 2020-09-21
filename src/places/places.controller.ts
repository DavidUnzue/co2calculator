import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlacesService } from './places.service';
import { Place } from './interfaces/place.interface';

@Controller('places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  async getPlaces(): Promise<Place[]> {
    return this.placesService.findAll();
  }

  @Get(':id')
  async getPlace(@Param('id') placeId: string): Promise<Place> {
    const place = await this.placesService.findOne(placeId);
    return place;
  }
}
