import { Module } from '@nestjs/common';
import { FlightEmployeeService } from './flight-employee.service';
import { FlightEmployeeController } from './flight-employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlightEmployee } from './entities/flight-employee.entity';
import { Flight } from 'src/flight/entities/flight.entity';
import { Employee } from 'src/employee/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FlightEmployee, Flight, Employee])],
  controllers: [FlightEmployeeController],
  providers: [FlightEmployeeService],
  exports: [FlightEmployeeService],
})
export class FlightEmployeeModule {}
