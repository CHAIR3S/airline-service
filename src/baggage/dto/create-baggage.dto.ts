import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { BaggageStatus } from '../entities/baggage.entity';

export class CreateBaggageDto {
  @ApiProperty()
  @IsInt()
  reservationId: number;

  @ApiProperty()
  @IsNumber()
  weight: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ default: 0 })
  @IsOptional()
  @IsNumber()
  extraCharge?: number;

  @ApiProperty({ enum: BaggageStatus })
  @IsEnum(BaggageStatus)
  status: BaggageStatus;
}
