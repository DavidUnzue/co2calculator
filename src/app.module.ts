import { Module } from '@nestjs/common';
import { RoutesModule } from './routes/routes.module';
import { PlacesModule } from './places/places.module';

@Module({
  imports: [RoutesModule, PlacesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
