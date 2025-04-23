import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Flight } from '../../flight/entities/flight.entity';

export enum SeatClass {
  ECONOMY = 'ECONOMY',
  BUSINESS = 'BUSINESS',
  FIRST = 'FIRST',
}

@Entity({ name: 'seat', schema: 'airline' })
export class Seat {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'seat_id' })
  seatId: number;

  @ApiProperty({ example: '12A' })
  @Column({ name: 'seat_number', type: 'varchar' })
  seatNumber: string;

  @ApiProperty({ enum: SeatClass })
  @Column({ type: 'varchar', length: 20, enum: SeatClass })
  class: SeatClass;

  @ApiProperty({ default: true })
  @Column({ default: true })
  available: boolean;

  @ApiProperty({ type: () => Flight })
  @ManyToOne(() => Flight)
  @JoinColumn({ name: 'flight_id' })
  flight: Flight;
}
