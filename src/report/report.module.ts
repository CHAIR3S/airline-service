// report.module.ts
import { Module } from '@nestjs/common';
import { ReportService } from './report.service'
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from '../reservation/entities/reservation.entity';
import { Flight } from '../flight/entities/flight.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, Flight, User]),
  ],
  providers: [ReportService],
  controllers: [ReportController],
  exports: [ReportService],
})
export class ReportModule {}
