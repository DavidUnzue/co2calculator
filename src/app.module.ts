import { Module } from '@nestjs/common';
import { RoutesModule } from './routes/routes.module';
import { PlacesModule } from './places/places.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [RoutesModule, PlacesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
