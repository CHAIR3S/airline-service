import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString, IsInt } from 'class-validator';
import { SeatClass } from '../entities/seat.entity';

export class CreateSeatDto {
  @ApiProperty({ example: '12A' })
  @IsString()
  seatNumber: string;

  @ApiProperty({ enum: SeatClass })
  @IsEnum(SeatClass)
  class: SeatClass;

  @ApiProperty({ default: true })
  @IsOptional()
  @IsBoolean()
  available?: boolean;

  @ApiProperty({ example: 1 })
  @IsInt()
  flightId: number;
}
