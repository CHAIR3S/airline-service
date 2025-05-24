import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AirlineService } from './airline.service';
import { CreateAirlineDto } from './dto/create-airline.dto';
import { UpdateAirlineDto } from './dto/update-airline.dto';

@Controller('airline')
export class AirlineController {
  constructor(private readonly airlineService: AirlineService) {}

  @Post()
  create(@Body() dto: CreateAirlineDto) {
    return this.airlineService.create(dto);
  }

  @Get()
  findAll() {
    return this.airlineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.airlineService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAirlineDto) {
    return this.airlineService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.airlineService.remove(+id);
  }
}