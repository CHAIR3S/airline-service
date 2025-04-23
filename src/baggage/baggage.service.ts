import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Baggage } from './entities/baggage.entity';
import { CreateBaggageDto } from './dto/create-baggage.dto';
import { UpdateBaggageDto } from './dto/update-baggage.dto';
import { Reservation } from '../reservation/entities/reservation.entity';

@Injectable()
export class BaggageService {
  constructor(
    @InjectRepository(Baggage)
    private readonly baggageRepo: Repository<Baggage>,
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
  ) {}

  async create(dto: CreateBaggageDto): Promise<Baggage> {
    const reservation = await this.reservationRepo.findOneBy({ reservationId: dto.reservationId });
    if (!reservation) throw new NotFoundException(`Reservation ID ${dto.reservationId} not found`);

    const baggage = this.baggageRepo.create({
      ...dto,
      extraCharge: dto.extraCharge ?? 0,
      reservation,
    });

    return this.baggageRepo.save(baggage);
  }

  async findAll(): Promise<Baggage[]> {
    return this.baggageRepo.find({ relations: ['reservation'] });
  }

  async findOne(id: number): Promise<Baggage> {
    const baggage = await this.baggageRepo.findOne({ where: { baggageId: id }, relations: ['reservation'] });
    if (!baggage) throw new NotFoundException(`Baggage ID ${id} not found`);
    return baggage;
  }

  async update(id: number, dto: UpdateBaggageDto): Promise<Baggage> {
    const baggage = await this.findOne(id);

    if (dto.reservationId) {
      const reservation = await this.reservationRepo.findOneBy({ reservationId: dto.reservationId });
      if (!reservation) throw new NotFoundException(`Reservation ID ${dto.reservationId} not found`);
      baggage.reservation = reservation;
    }

    Object.assign(baggage, dto);
    return this.baggageRepo.save(baggage);
  }

  async remove(id: number): Promise<void> {
    const result = await this.baggageRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Baggage ID ${id} not found`);
  }
}
