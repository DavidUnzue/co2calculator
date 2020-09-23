import { ApiProperty } from '@nestjs/swagger';

export class Place {
  @ApiProperty()
  id: string;
  @ApiProperty()
  label: string;
  @ApiProperty()
  lat: string;
  @ApiProperty()
  long: string;
}
