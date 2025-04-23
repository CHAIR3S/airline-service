import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    Unique,
  } from 'typeorm';
  import { Client } from '../../client/entities/client.entity';
  import { Flight } from '../../flight/entities/flight.entity';
  import { Seat } from '../../seat/entities/seat.entity';
  import { ApiProperty } from '@nestjs/swagger';
  
  export enum ReservationStatus {
    RESERVED = 'RESERVED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED',
  }
  
  @Entity({ name: 'reservation', schema: 'public' })
  @Unique(['seat'])
  export class Reservation {
    @ApiProperty()
    @PrimaryGeneratedColumn({ name: 'reservation_id' })
    reservationId: number;
  
    @ApiProperty({ type: () => Client })
    @ManyToOne(() => Client)
    @JoinColumn({ name: 'client_id' })
    client: Client;
  
    @ApiProperty({ type: () => Flight })
    @ManyToOne(() => Flight)
    @JoinColumn({ name: 'flight_id' })
    flight: Flight;
  
    @ApiProperty({ type: () => Seat })
    @ManyToOne(() => Seat)
    @JoinColumn({ name: 'seat_id' })
    seat: Seat;
  
    @ApiProperty()
    @CreateDateColumn({ name: 'reservation_date', type: 'timestamp' })
    reservationDate: Date;
  
    @ApiProperty({ enum: ReservationStatus })
    @Column({ type: 'varchar', length: 20, enum: ReservationStatus })
    status: ReservationStatus;
  }
  