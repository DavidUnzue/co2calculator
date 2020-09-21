import { Injectable, NotFoundException } from '@nestjs/common';
import { Place } from './interfaces/place.interface';
import { places } from '../mocks';

@Injectable()
export class PlacesService {
  private readonly places: Place[] = places;

  findAll(): Promise<Place[]> {
    return new Promise(resolve => {
      resolve(this.places);
    });
  }

  findOne(placeId: string): Promise<Place> {
    return new Promise(resolve => {
      const place = this.places.find(place => place.id === placeId);
      if (!place) {
        throw new NotFoundException('Place does not exist');
      }
      resolve(place);
    });
  }
}
