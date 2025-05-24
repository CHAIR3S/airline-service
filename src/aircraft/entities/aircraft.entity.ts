import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Airline } from 'src/airline/entities/airline.entity';

export enum AircraftStatus {
  ACTIVE = 'ACTIVE',
  MAINTENANCE = 'MAINTENANCE',
  RETIRED = 'RETIRED',
}

@Entity({ name: 'aircraft', schema: 'public' })
export class Aircraft {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ name: 'aircraft_id' })
  aircraftId: number;

  @ApiProperty({ example: 'Boeing 737' })
  @Column({ type: 'varchar' })
  model: string;

  @ApiProperty({ example: 180 })
  @Column({ type: 'int' })
  capacity: number;

  @ApiProperty({ enum: AircraftStatus })
  @Column({
    type: 'varchar',
    length: 20,
    enum: AircraftStatus,
  })
  status: AircraftStatus;


  @ApiProperty({ type: () => Airline })
  @ManyToOne(() => Airline, { nullable: true })
  @JoinColumn({ name: 'airline_id' })
  airline: Airline;

}
