import { Module } from '@nestjs/common';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';
import { GoClimateService } from './goClimate.service';

@Module({
  imports: [],
  controllers: [RoutesController],
  providers: [RoutesService, GoClimateService],
})
export class RoutesModule {}
