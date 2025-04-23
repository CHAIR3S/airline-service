import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  import { Reservation } from '../../reservation/entities/reservation.entity';
  
  export enum PaymentMethod {
    CREDIT = 'CREDIT',
    DEBIT = 'DEBIT',
    PAYPAL = 'PAYPAL',
    CASH = 'CASH',
  }
  
  export enum PaymentStatus {
    PAID = 'PAID',
    REFUNDED = 'REFUNDED',
    PENDING = 'PENDING',
  }
  
  @Entity({ name: 'payment', schema: 'airline' })
  export class Payment {
    @ApiProperty()
    @PrimaryGeneratedColumn({ name: 'payment_id' })
    paymentId: number;
  
    @ApiProperty({ type: () => Reservation })
    @ManyToOne(() => Reservation)
    @JoinColumn({ name: 'reservation_id' })
    reservation: Reservation;
  
    @ApiProperty()
    @Column({ type: 'numeric' })
    amount: number;
  
    @ApiProperty({ enum: PaymentMethod })
    @Column({ name: 'payment_method', type: 'varchar', length: 20 })
    paymentMethod: PaymentMethod;
  
    @ApiProperty({ enum: PaymentStatus })
    @Column({ type: 'varchar', length: 20 })
    status: PaymentStatus;
  
    @ApiProperty()
    @CreateDateColumn({ name: 'payment_date', type: 'timestamp' })
    paymentDate: Date;
  }
  