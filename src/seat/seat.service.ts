import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from './entities/seat.entity';
import { Flight } from '../flight/entities/flight.entity';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepo: Repository<Seat>,
    @InjectRepository(Flight)
    private readonly flightRepo: Repository<Flight>,
  ) {}

  async create(dto: CreateSeatDto): Promise<Seat> {
    const flight = await this.flightRepo.findOneBy({ flightId: dto.flightId });
    if (!flight) throw new NotFoundException(`Flight ID ${dto.flightId} not found`);

    const seat = this.seatRepo.create({
      ...dto,
      available: dto.available ?? true,
      flight,
    });

    return this.seatRepo.save(seat);
  }

  async findAll(): Promise<Seat[]> {
    return this.seatRepo.find({ relations: ['flight'] });
  }

  async findOne(id: number): Promise<Seat> {
    const seat = await this.seatRepo.findOne({ where: { seatId: id }, relations: ['flight'] });
    if (!seat) throw new NotFoundException(`Seat ID ${id} not found`);
    return seat;
  }

  async update(id: number, dto: UpdateSeatDto): Promise<Seat> {
    const seat = await this.findOne(id);

    if (dto.flightId) {
      const flight = await this.flightRepo.findOneBy({ flightId: dto.flightId });
      if (!flight) throw new NotFoundException(`Flight ID ${dto.flightId} not found`);
      seat.flight = flight;
    }

    Object.assign(seat, {
      ...dto,
      seatNumber: dto.seatNumber ?? seat.seatNumber,
      class: dto.class ?? seat.class,
      available: dto.available ?? seat.available,
    });

    return this.seatRepo.save(seat);
  }

  async remove(id: number): Promise<void> {
    const result = await this.seatRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Seat ID ${id} not found`);
  }
}
