import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt } from 'class-validator';
import { ReservationStatus } from '../entities/reservation.entity';

export class CreateReservationDto {
  @ApiProperty()
  @IsInt()
  clientId: number;

  @ApiProperty()
  @IsInt()
  flightId: number;

  @ApiProperty()
  @IsInt()
  seatId: number;

  @ApiProperty({ enum: ReservationStatus, default: ReservationStatus.RESERVED })
  @IsEnum(ReservationStatus)
  status: ReservationStatus;
}
