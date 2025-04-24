import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt } from 'class-validator';

export class CreateCheckinDto {
  @ApiProperty()
  @IsInt()
  reservationId: number;

  @ApiProperty()
  @IsDateString()
  checkinDate: string;
}
