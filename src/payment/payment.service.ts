import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Reservation } from '../reservation/entities/reservation.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
  ) {}

  async create(dto: CreatePaymentDto): Promise<Payment> {
    const reservation = await this.reservationRepo.findOneBy({ reservationId: dto.reservationId });
    if (!reservation) throw new NotFoundException(`Reservation ID ${dto.reservationId} not found`);

    const payment = this.paymentRepo.create({ ...dto, reservation });
    return this.paymentRepo.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return this.paymentRepo.find({ relations: ['reservation'] });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepo.findOne({ where: { paymentId: id }, relations: ['reservation'] });
    if (!payment) throw new NotFoundException(`Payment ID ${id} not found`);
    return payment;
  }

  async update(id: number, dto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.findOne(id);

    if (dto.reservationId) {
      const reservation = await this.reservationRepo.findOneBy({ reservationId: dto.reservationId });
      if (!reservation) throw new NotFoundException(`Reservation ID ${dto.reservationId} not found`);
      payment.reservation = reservation;
    }

    Object.assign(payment, dto);
    return this.paymentRepo.save(payment);
  }

  async remove(id: number): Promise<void> {
    const result = await this.paymentRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Payment ID ${id} not found`);
  }
}
