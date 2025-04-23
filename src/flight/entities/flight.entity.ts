import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Aircraft } from '../../aircraft/entities/aircraft.entity';

export enum FlightStatus {
  SCHEDULED = 'SCHEDULED',
  DEPARTED = 'DEPARTED',
  ARRIVED = 'ARRIVED',
  CANCELLED = 'CANCELLED',
  DELAYED = 'DELAYED',
}

@Entity({ name: 'flight', schema: 'public' })
export class Flight {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'flight_id' })
  flightId: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  origin: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  destination: string;

  @ApiProperty()
  @Column({ name: 'departure_time', type: 'timestamp' })
  departureTime: Date;

  @ApiProperty()
  @Column({ name: 'arrival_time', type: 'timestamp' })
  arrivalTime: Date;

  @ApiProperty({ enum: FlightStatus })
  @Column({
    type: 'varchar',
    length: 20,
    enum: FlightStatus,
  })
  status: FlightStatus;

  @ApiProperty({ type: () => Aircraft })
  @ManyToOne(() => Aircraft)
  @JoinColumn({ name: 'aircraft_id' })
  aircraft: Aircraft;

  @ApiProperty()
  @Column({ name: 'last_latitude', type: 'decimal', precision: 10, scale: 6, nullable: true })
  lastLatitude: number;

  @ApiProperty()
  @Column({ name: 'last_longitude', type: 'decimal', precision: 10, scale: 6, nullable: true })
  lastLongitude: number;

  @ApiProperty()
  @Column({ name: 'last_altitude', type: 'int', nullable: true })
  lastAltitude: number;

  @ApiProperty()
  @Column({ name: 'last_speed_kmh', type: 'int', nullable: true })
  lastSpeedKmh: number;

  @ApiProperty()
  @Column({ name: 'last_updated', type: 'timestamp', nullable: true })
  lastUpdated: Date;
}
