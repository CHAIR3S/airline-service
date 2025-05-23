import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AircraftService } from './aircraft.service';
import { CreateAircraftDto } from './dto/create-aircraft.dto';

@Controller('aircraft')
export class AircraftController {
  constructor(private readonly aircraftService: AircraftService) {}

  @Post()
  create(@Body() createAircraftDto: CreateAircraftDto) {
    return this.aircraftService.create(createAircraftDto);
  }

  @Get()
  findAll() {
    return this.aircraftService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aircraftService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAircraftDto: CreateAircraftDto) {
    return this.aircraftService.update(+id, updateAircraftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aircraftService.remove(+id);
  }
}
