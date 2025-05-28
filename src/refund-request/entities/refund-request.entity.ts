import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
  } from 'typeorm';
  import { Payment } from '../../payment/entities/payment.entity';
  import { ApiProperty } from '@nestjs/swagger';
  
  export enum RefundStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    PROCESSED = 'PROCESSED',
  }
  
  @Entity({ name: 'refund_request', schema: 'public' })
  export class RefundRequest {
    @ApiProperty()
    @PrimaryGeneratedColumn({ name: 'request_id' })
    requestId: number;
  
    @ApiProperty({ type: () => Payment })
    @ManyToOne(() => Payment)
    @JoinColumn({ name: 'payment_id' })
    payment: Payment;
  
    @ApiProperty()
    @Column({ type: 'text' })
    reason: string;
  
    @ApiProperty({ enum: RefundStatus })
    @Column({ type: 'varchar', length: 20 })
    status: RefundStatus;
  
    @ApiProperty()
    @CreateDateColumn({ name: 'request_date', type: 'timestamp' })
    requestDate: Date;
  
    @ApiProperty({ required: false })
    @Column({ name: 'resolution_date', type: 'timestamp', nullable: true })
    resolutionDate: Date | null;
  }
  