import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { AircraftStatus } from '../entities/aircraft.entity';

export class CreateAircraftDto {
  @ApiProperty({ example: 'Airbus A320' })
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty({ example: 150 })
  @IsInt()
  @Min(1)
  capacity: number;

  @ApiProperty({ enum: AircraftStatus })
  @IsEnum(AircraftStatus)
  status: AircraftStatus;
}
