import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateClientDto): Promise<Client> {
    const user = await this.userRepo.findOneBy({ userId: dto.userId });
    if (!user) throw new NotFoundException(`User ID ${dto.userId} not found`);

    const client = this.clientRepo.create({
      user,
      passport: dto.passport,
      phone: dto.phone,
      frequent: dto.frequent ?? false,
      preferences: dto.preferences ?? {},
    });

    return this.clientRepo.save(client);
  }

  async findAll(): Promise<Client[]> {
    return this.clientRepo.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepo.findOne({ where: { clientId: id }, relations: ['user'] });
    if (!client) throw new NotFoundException(`Client ID ${id} not found`);
    return client;
  }

  async update(id: number, dto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);

    if (dto.userId) {
      const user = await this.userRepo.findOneBy({ userId: dto.userId });
      if (!user) throw new NotFoundException(`User ID ${dto.userId} not found`);
      client.user = user;
    }

    Object.assign(client, {
      ...dto,
      passport: dto.passport ?? client.passport,
      phone: dto.phone ?? client.phone,
      frequent: dto.frequent ?? client.frequent,
      preferences: dto.preferences ?? client.preferences,
    });

    return this.clientRepo.save(client);
  }

  async remove(id: number): Promise<void> {
    const result = await this.clientRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Client ID ${id} not found`);
  }
}
