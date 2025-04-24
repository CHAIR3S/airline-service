import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Checkin } from './entities/checkin.entity';
import { Reservation } from '../reservation/entities/reservation.entity';
import { CheckinService } from './checkin.service';
import { CheckinController } from './checkin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Checkin, Reservation])],
  controllers: [CheckinController],
  providers: [CheckinService],
  exports: [CheckinService],
})
export class CheckinModule {}
