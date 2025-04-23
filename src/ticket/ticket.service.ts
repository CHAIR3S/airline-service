import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Reservation } from '../reservation/entities/reservation.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,
    @InjectRepository(Reservation)
    private readonly reservationRepo: Repository<Reservation>,
  ) {}

  async create(dto: CreateTicketDto): Promise<Ticket> {
    const reservation = await this.reservationRepo.findOneBy({ reservationId: dto.reservationId });
    if (!reservation) throw new NotFoundException(`Reservation ID ${dto.reservationId} not found`);

    const ticket = this.ticketRepo.create({ reservation, barcode: dto.barcode });
    return this.ticketRepo.save(ticket);
  }

  async findAll(): Promise<Ticket[]> {
    return this.ticketRepo.find({ relations: ['reservation'] });
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketRepo.findOne({ where: { ticketId: id }, relations: ['reservation'] });
    if (!ticket) throw new NotFoundException(`Ticket ID ${id} not found`);
    return ticket;
  }

  async update(id: number, dto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.findOne(id);

    if (dto.reservationId) {
      const reservation = await this.reservationRepo.findOneBy({ reservationId: dto.reservationId });
      if (!reservation) throw new NotFoundException(`Reservation ID ${dto.reservationId} not found`);
      ticket.reservation = reservation;
    }

    if (dto.barcode !== undefined) {
      ticket.barcode = dto.barcode;
    }

    return this.ticketRepo.save(ticket);
  }

  async remove(id: number): Promise<void> {
    const result = await this.ticketRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Ticket ID ${id} not found`);
  }
}
