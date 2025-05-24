import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight, FlightStatus } from './entities/flight.entity';
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

    const flight = this.flightRepo.create({ ...dto, aircraft, origin: { placeId: dto.originId }, destination: { placeId: dto.destinationId }, airline: { airlineId: dto.airlineId } });
    return this.flightRepo.save(flight);
  }

  async findAll(): Promise<Flight[]> {
    return this.flightRepo.find({ relations: ['aircraft', 'airline'] });
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


  //Metodo para buscar vuelos por fecha y destino
  async findByDateAndDestination(
    date: string,
    destinationId: number,
    originId: number,
  ){

    console.log('findByDateAndDestination', date, destinationId, originId);

    return this.flightRepo
      .createQueryBuilder('flight')
      .leftJoinAndSelect('flight.destination', 'destination')
      .leftJoinAndSelect('flight.origin', 'origin')
      .leftJoinAndSelect('flight.aircraft', 'aircraft')
      .leftJoinAndSelect('flight.airline', 'airline')
      .where('DATE(flight.departureTime) = :date', { date })
      .andWhere('origin.placeId = :originId', { originId })
      .andWhere('destination.placeId = :destinationId', { destinationId })
      .andWhere('flight.status = :status', { status: FlightStatus.SCHEDULED })
      .getMany();
  }


  async findScheduledFlightDates(originId: number, destinationId: number): Promise<string[]> {
    const flights = await this.flightRepo
      .createQueryBuilder('flight')
      .select('DISTINCT DATE(flight.departure_time)', 'date')
      .where('flight.origin_id = :originId', { originId })
      .andWhere('flight.destination_id = :destinationId', { destinationId })
      .andWhere('flight.status = :status', { status: FlightStatus.SCHEDULED })
      .orderBy('date', 'ASC')
    .getRawMany<{ date: string }>();

    // array de strings ISO como "2025-06-01"
    return flights.map((f) => f.date); 
  }

}
