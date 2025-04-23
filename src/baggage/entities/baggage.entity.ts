import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  import { Reservation } from '../../reservation/entities/reservation.entity';
  
  export enum BaggageStatus {
    CHECKED_IN = 'CHECKED_IN',
    IN_TRANSIT = 'IN_TRANSIT',
    DELIVERED = 'DELIVERED',
    LOST = 'LOST',
  }
  
  @Entity({ name: 'baggage', schema: 'airline' })
  export class Baggage {
    @ApiProperty()
    @PrimaryGeneratedColumn({ name: 'baggage_id' })
    baggageId: number;
  
    @ApiProperty({ type: () => Reservation })
    @ManyToOne(() => Reservation)
    @JoinColumn({ name: 'reservation_id' })
    reservation: Reservation;
  
    @ApiProperty()
    @Column({ type: 'numeric' })
    weight: number;
  
    @ApiProperty()
    @Column({ type: 'text' })
    description: string;
  
    @ApiProperty({ default: 0 })
    @Column({ name: 'extra_charge', type: 'numeric', default: 0 })
    extraCharge: number;
  
    @ApiProperty({ enum: BaggageStatus })
    @Column({ type: 'varchar', length: 20 })
    status: BaggageStatus;
  }
  