import { Module } from '@nestjs/common';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';

@Module({
  imports: [],
  controllers: [RoutesController],
  providers: [RoutesService],
})
export class RoutesModule {}
