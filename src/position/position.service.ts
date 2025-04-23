import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePositionDto } from './dto/create-position.dto';
import { Position } from './entities/position.entity';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) {}

  async create(createDto: CreatePositionDto): Promise<Position> {
    const position = this.positionRepository.create(createDto);
    return this.positionRepository.save(position);
  }

  async findAll(): Promise<Position[]> {
    return this.positionRepository.find();
  }

  async findOne(id: number): Promise<Position> {
    const position = await this.positionRepository.findOneBy({ positionId: id });
    if (!position) throw new NotFoundException(`Position with ID ${id} not found`);
    return position;
  }

  async update(id: number, updateDto: CreatePositionDto): Promise<Position> {
    const position = await this.findOne(id);
    Object.assign(position, updateDto);
    return this.positionRepository.save(position);
  }

  async remove(id: number): Promise<void> {
    const result = await this.positionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Position with ID ${id} not found`);
    }
  }
}
