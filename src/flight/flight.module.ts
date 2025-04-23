import { Module } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './entities/flight.entity';
import { Aircraft } from 'src/aircraft/entities/aircraft.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flight, Aircraft])],
  controllers: [FlightController],
  providers: [FlightService],
  exports: [FlightService],
})
export class FlightModule {}
