import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { Client } from '../client/entities/client.entity';
import { Flight } from '../flight/entities/flight.entity';
import { Seat } from '../seat/entities/seat.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
    @InjectRepository(Flight)
    private readonly flightRepo: Repository<Flight>,
    @InjectRepository(Seat)
    private readonly seatRepo: Repository<Seat>,
  ) {}

  async create(dto: CreateReservationDto): Promise<Reservation> {
    const client = await this.clientRepo.findOneBy({ clientId: dto.clientId });
    const flight = await this.flightRepo.findOneBy({ flightId: dto.flightId });
    const seat = await this.seatRepo.findOneBy({ seatId: dto.seatId });

    if (!client) throw new NotFoundException(`Client ID ${dto.clientId} not found`);
    if (!flight) throw new NotFoundException(`Flight ID ${dto.flightId} not found`);
    if (!seat) throw new NotFoundException(`Seat ID ${dto.seatId} not found`);
    // if (!seat.available) throw new BadRequestException(`Seat ID ${dto.seatId} is not available`);

    // seat.available = false;
    // await this.seatRepo.save(seat);

    const reservation = this.reservationRepo.create({ client, flight, seat, status: dto.status });
    return this.reservationRepo.save(reservation);
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationRepo.find({ relations: ['client', 'flight', 'seat'] });
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.reservationRepo.findOne({ where: { reservationId: id }, relations: ['client', 'flight', 'seat'] });
    if (!reservation) throw new NotFoundException(`Reservation ID ${id} not found`);
    return reservation;
  }

  async update(id: number, dto: UpdateReservationDto): Promise<Reservation> {
    const reservation = await this.findOne(id);

    if (dto.status) {
      reservation.status = dto.status;
    }

    return this.reservationRepo.save(reservation);
  }

  async remove(id: number): Promise<void> {
    const reservation = await this.findOne(id);

    if (reservation.seat) {
      reservation.seat.available = true;
      await this.seatRepo.save(reservation.seat);
    }

    await this.reservationRepo.remove(reservation);
  }
}
