import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class Route {
  @ApiProperty()
  readonly origin: string;

  @ApiProperty()
  readonly destination: string;

  @ApiProperty()
  readonly vehicle: string;

  @ApiProperty()
  @IsOptional()
  readonly distance?: number;

  @ApiProperty()
  @IsOptional()
  readonly footprint?: number;
}
