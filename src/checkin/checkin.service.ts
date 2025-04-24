import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Checkin } from './entities/checkin.entity';
import { CreateCheckinDto } from './dto/create-checkin.dto';
import { UpdateCheckinDto } from './dto/update-checkin.dto';
import { Reservation } from '../reservation/entities/reservation.entity';

@Injectable()
export class CheckinService {
  constructor(
    @InjectRepository(Checkin)
    private readonly checkinRepo: Repository<Checkin>,
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
  ) {}

  async create(dto: CreateCheckinDto): Promise<Checkin> {
    const reservation = await this.reservationRepo.findOneBy({ reservationId: dto.reservationId });
    if (!reservation) throw new NotFoundException(`Reservation ID ${dto.reservationId} not found`);

    const checkin = this.checkinRepo.create({
      reservation,
      checkinDate: new Date(dto.checkinDate),
    });

    return this.checkinRepo.save(checkin);
  }

  async findAll(): Promise<Checkin[]> {
    return this.checkinRepo.find({ relations: ['reservation'] });
  }

  async findOne(id: number): Promise<Checkin> {
    const checkin = await this.checkinRepo.findOne({ where: { checkinId: id }, relations: ['reservation'] });
    if (!checkin) throw new NotFoundException(`Check-in ID ${id} not found`);
    return checkin;
  }

  async update(id: number, dto: UpdateCheckinDto): Promise<Checkin> {
    const checkin = await this.findOne(id);

    if (dto.reservationId) {
      const reservation = await this.reservationRepo.findOneBy({ reservationId: dto.reservationId });
      if (!reservation) throw new NotFoundException(`Reservation ID ${dto.reservationId} not found`);
      checkin.reservation = reservation;
    }

    if (dto.checkinDate) checkin.checkinDate = new Date(dto.checkinDate);

    return this.checkinRepo.save(checkin);
  }

  async remove(id: number): Promise<void> {
    const result = await this.checkinRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Check-in ID ${id} not found`);
  }
}
