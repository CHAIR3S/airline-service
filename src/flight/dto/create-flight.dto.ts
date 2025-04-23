import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { FlightStatus } from '../entities/flight.entity';

export class CreateFlightDto {
  @ApiProperty()
  @IsString()
  origin: string;

  @ApiProperty()
  @IsString()
  destination: string;

  @ApiProperty()
  @IsDateString()
  departureTime: string;

  @ApiProperty()
  @IsDateString()
  arrivalTime: string;

  @ApiProperty({ enum: FlightStatus })
  @IsEnum(FlightStatus)
  status: FlightStatus;

  @ApiProperty()
  @IsInt()
  aircraftId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  lastLatitude?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  lastLongitude?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  lastAltitude?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  lastSpeedKmh?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  lastUpdated?: string;
}
