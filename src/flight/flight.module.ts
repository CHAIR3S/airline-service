import { Module } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './entities/flight.entity';
import { Aircraft } from 'src/aircraft/entities/aircraft.entity';
import { Place } from 'src/place/entities/place.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flight, Aircraft, Place])],
  controllers: [FlightController],
  providers: [FlightService],
  exports: [FlightService],
})
export class FlightModule {}
