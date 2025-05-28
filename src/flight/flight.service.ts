import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { Flight, FlightStatus } from './entities/flight.entity';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { Aircraft } from '../aircraft/entities/aircraft.entity';
import { Buffer } from 'buffer';
import { Payment } from 'src/payment/entities/payment.entity';



@Injectable()
export class FlightService {
  constructor(
    @InjectRepository(Flight)
    private readonly flightRepo: Repository<Flight>,
    @InjectRepository(Aircraft)
    private readonly aircraftRepo: Repository<Aircraft>,
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>
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


async findAllActive(): Promise<Flight[]> {
  const vuelos = await this.flightRepo.find({
    where: {
      status: Not(In([FlightStatus.ARRIVED, FlightStatus.CANCELLED]))
    },
    relations: ['aircraft', 'airline', 'origin', 'destination'],
  });

  const vuelosConvertidos = vuelos.map((vuelo) => {
    const placePhoto : any = vuelo.destination.photo;

    // Asegúrate de que existe y es tipo Buffer
    if (placePhoto) {
      const buffer = Buffer.from(placePhoto);
      const base64 = buffer.toString('base64');
      
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (vuelo.destination as any).photoBase64 = `data:image/png;base64,${base64}`;
    }

    return vuelo;
  });

  return vuelosConvertidos;
}

  async findOne(id: number): Promise<Flight> {
    const flight = await this.flightRepo.findOne({ where: { flightId: id }, relations: ['aircraft', 'origin', 'destination', 'airline'] });
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


  async countByStatus() {
    const result: { status: FlightStatus; count: string }[] = await this.flightRepo
      .createQueryBuilder('flight')
      .select('flight.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .groupBy('flight.status')
      .getRawMany();

    const statusCounts: Record<FlightStatus, number> = {
      SCHEDULED: 0,
      ARRIVED: 0,
      CANCELLED: 0,
      DEPARTED: 0,
      DELAYED: 0,
    };

    for (const row of result) {
      const status = row.status;
      if (status in statusCounts) {
        statusCounts[status] = parseInt(row.count, 10);
      }
    }



    //Payment
    const result2 = await this.paymentRepo
      .createQueryBuilder('payment')
      .select('SUM(payment.amount)', 'total')
      .getRawOne<{ total: string }>();

     const totalAmount = result2?.total ? parseFloat(result2.total) : 0;

    return {statusCounts, totalAmount};
  }



}
