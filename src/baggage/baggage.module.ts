import { Module } from '@nestjs/common';
import { BaggageService } from './baggage.service';
import { BaggageController } from './baggage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Baggage } from './entities/baggage.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Baggage, Reservation])],
  controllers: [BaggageController],
  providers: [BaggageService],
  exports: [BaggageService],
})
export class BaggageModule {}
