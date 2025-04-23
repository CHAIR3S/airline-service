import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './entities/flight.entity';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { Aircraft } from '../aircraft/entities/aircraft.entity';

@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepo: Repository<Flight>,
    @InjectRepository(Aircraft)
    private readonly aircraftRepo: Repository<Aircraft>,
  ) {}

  async create(dto: CreateFlightDto): Promise<Flight> {
    const aircraft = await this.aircraftRepo.findOneBy({ aircraftId: dto.aircraftId });
    if (!aircraft) throw new NotFoundException(`Aircraft ID ${dto.aircraftId} not found`);

    const flight = this.flightRepo.create({ ...dto, aircraft });
    return this.flightRepo.save(flight);
  }

  async findAll(): Promise<Flight[]> {
    return this.flightRepo.find({ relations: ['aircraft'] });
  }

  async findOne(id: number): Promise<Flight> {
    const flight = await this.flightRepo.findOne({ where: { flightId: id }, relations: ['aircraft'] });
    if (!flight) throw new NotFoundException(`Flight ID ${id} not found`);
    return flight;
  }

  async update(id: number, dto: UpdateFlightDto): Promise<Flight> {
    const flight = await this.findOne(id);

    if (dto.aircraftId) {
      const aircraft = await this.aircraftRepo.findOneBy({ aircraftId: dto.aircraftId });
      if (!aircraft) throw new NotFoundException(`Aircraft ID ${dto.aircraftId} not found`);
      flight.aircraft = aircraft;
    }

    Object.assign(flight, dto);
    return this.flightRepo.save(flight);
  }

  async remove(id: number): Promise<void> {
    const result = await this.flightRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Flight ID ${id} not found`);
    }
  }
}
