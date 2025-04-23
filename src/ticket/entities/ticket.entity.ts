import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
  } from 'typeorm';
  import { Reservation } from '../../reservation/entities/reservation.entity';
  import { ApiProperty } from '@nestjs/swagger';
  
  @Entity({ name: 'ticket', schema: 'public' })
  export class Ticket {
    @ApiProperty()
    @PrimaryGeneratedColumn({ name: 'ticket_id' })
    ticketId: number;
  
    @ApiProperty({ type: () => Reservation })
    @ManyToOne(() => Reservation)
    @JoinColumn({ name: 'reservation_id' })
    reservation: Reservation;
  
    @ApiProperty({ example: 'ABC123XYZ987' })
    @Column({ type: 'varchar' })
    barcode: string;
  
    @ApiProperty()
    @CreateDateColumn({ name: 'issue_date', type: 'timestamp' })
    issueDate: Date;
  }
  