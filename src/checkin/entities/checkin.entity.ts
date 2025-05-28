import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  import { Reservation } from '../../reservation/entities/reservation.entity';
  
  @Entity({ name: 'checkin', schema: 'public' })
  export class Checkin {
    @ApiProperty()
    @PrimaryGeneratedColumn({ name: 'checkin_id' })
    checkinId: number;
  
    @ApiProperty({ type: () => Reservation })
    @ManyToOne(() => Reservation)
    @JoinColumn({ name: 'reservation_id' })
    reservation: Reservation;
  
    @ApiProperty()
    @Column({ name: 'checkin_date', type: 'timestamp' })
    checkinDate: Date;
  }
  