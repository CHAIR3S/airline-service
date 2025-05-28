import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { FlightService } from './flight.service';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';

@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Post()
  create(@Body() createFlightDto: CreateFlightDto) {
    return this.flightService.create(createFlightDto);
  }

  @Get()
  findAll() {
    return this.flightService.findAll();
  }

  @Get('count-by-status')
  countByStatus() {
    return this.flightService.countByStatus();
  }


  @Get('active')
  findAllActive() {
    return this.flightService.findAllActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlightDto: UpdateFlightDto) {
    return this.flightService.update(+id, updateFlightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flightService.remove(+id);
  }


  @Get('by-date-origin-destination/:date/:originId/:destinationId')
  findByDateAndDestination(
    @Param('date') date: string,
    @Param('originId', ParseIntPipe) originId: number,
    @Param('destinationId', ParseIntPipe) destinationId: number,
  ) {
    return this.flightService.findByDateAndDestination(date, destinationId, originId);
  }


  @Get('dates/:originId/:destinationId')
  getScheduledFlightDates(
    @Param('originId', ParseIntPipe) originId: number,
    @Param('destinationId', ParseIntPipe) destinationId: number,
  ) {
    return this.flightService.findScheduledFlightDates(originId, destinationId);
  }

}
