import { Module } from '@nestjs/common';
import { AirlineService } from './airline.service';
import { AirlineController } from './airline.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Airline } from './entities/airline.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Airline])],
  controllers: [AirlineController],
  providers: [AirlineService],
  exports: [AirlineService],
})
export class AirlineModule {}
