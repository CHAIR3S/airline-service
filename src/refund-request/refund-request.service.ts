import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefundRequest } from './entities/refund-request.entity';
import { CreateRefundRequestDto } from './dto/create-refund-request.dto';
import { UpdateRefundRequestDto } from './dto/update-refund-request.dto';
import { Payment } from '../payment/entities/payment.entity';

@Injectable()
export class RefundRequestService {
  constructor(
    @InjectRepository(RefundRequest)
    private readonly refundRepo: Repository<RefundRequest>,
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
  ) {}

  async create(dto: CreateRefundRequestDto): Promise<RefundRequest> {
    const payment = await this.paymentRepo.findOneBy({ paymentId: dto.paymentId });
    if (!payment) throw new NotFoundException(`Payment ID ${dto.paymentId} not found`);

    const refund = this.refundRepo.create({
      payment,
      reason: dto.reason,
      status: dto.status,
      resolutionDate: dto.resolutionDate ? new Date(dto.resolutionDate) : null,
    });

    return this.refundRepo.save(refund);
  }

  async findAll(): Promise<RefundRequest[]> {
    return this.refundRepo.find({ relations: ['payment'] });
  }

  async findOne(id: number): Promise<RefundRequest> {
    const refund = await this.refundRepo.findOne({ where: { requestId: id }, relations: ['payment'] });
    if (!refund) throw new NotFoundException(`Refund request ID ${id} not found`);
    return refund;
  }

  async update(id: number, dto: UpdateRefundRequestDto): Promise<RefundRequest> {
    const refund = await this.findOne(id);

    if (dto.paymentId) {
      const payment = await this.paymentRepo.findOneBy({ paymentId: dto.paymentId });
      if (!payment) throw new NotFoundException(`Payment ID ${dto.paymentId} not found`);
      refund.payment = payment;
    }

    Object.assign(refund, {
      reason: dto.reason ?? refund.reason,
      status: dto.status ?? refund.status,
      resolutionDate: dto.resolutionDate ? new Date(dto.resolutionDate) : refund.resolutionDate,
    });

    return this.refundRepo.save(refund);
  }

  async remove(id: number): Promise<void> {
    const result = await this.refundRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Refund request ID ${id} not found`);
  }
}
