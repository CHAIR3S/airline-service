
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Airline } from './entities/airline.entity';
import { CreateAirlineDto } from './dto/create-airline.dto';
import { UpdateAirlineDto } from './dto/update-airline.dto';

@Injectable()
export class AirlineService {
  constructor(
    @InjectRepository(Airline)
    private readonly airlineRepo: Repository<Airline>,
  ) {}

  async create(dto: CreateAirlineDto): Promise<Airline> {
    const airline = this.airlineRepo.create(dto);
    return this.airlineRepo.save(airline);
  }

  async findAll(): Promise<Airline[]> {
    return this.airlineRepo.find();
  }

  async findOne(id: number): Promise<Airline> {
    const airline = await this.airlineRepo.findOneBy({ airlineId: id });
    if (!airline) throw new NotFoundException('Airline not found');
    return airline;
  }

  async update(id: number, dto: UpdateAirlineDto): Promise<Airline> {
    await this.airlineRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.airlineRepo.delete(id);
  }
}