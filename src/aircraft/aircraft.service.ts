import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aircraft } from './entities/aircraft.entity';
import { CreateAircraftDto } from './dto/create-aircraft.dto';

@Injectable()
export class AircraftService {
  constructor(
    @InjectRepository(Aircraft)
    private readonly aircraftRepo: Repository<Aircraft>,
  ) {}

  async create(dto: CreateAircraftDto): Promise<Aircraft> {
    const aircraft = this.aircraftRepo.create(dto);
    return this.aircraftRepo.save(aircraft);
  }

  async findAll(): Promise<Aircraft[]> {
    return this.aircraftRepo.find();
  }

  async findOne(id: number): Promise<Aircraft> {
    const aircraft = await this.aircraftRepo.findOneBy({ aircraftId: id });
    if (!aircraft) throw new NotFoundException(`Aircraft with ID ${id} not found`);
    return aircraft;
  }

  async update(id: number, dto: CreateAircraftDto): Promise<Aircraft> {
    const aircraft = await this.findOne(id);
  
    aircraft.model = dto.model;
    aircraft.capacity = dto.capacity;
    aircraft.status = dto.status;
  
    return this.aircraftRepo.save(aircraft);
  }
  

  async remove(id: number): Promise<void> {
    const result = await this.aircraftRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Aircraft with ID ${id} not found`);
    }
  }
}
