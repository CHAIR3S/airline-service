import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FlightEmployeeService } from './flight-employee.service';
import { CreateFlightEmployeeDto } from './dto/create-flight-employee.dto';
import { UpdateFlightEmployeeDto } from './dto/update-flight-employee.dto';

@Controller('flight-employee')
export class FlightEmployeeController {
  constructor(private readonly flightEmployeeService: FlightEmployeeService) {}

  @Post()
  create(@Body() createFlightEmployeeDto: CreateFlightEmployeeDto) {
    return this.flightEmployeeService.create(createFlightEmployeeDto);
  }

  @Get()
  findAll() {
    return this.flightEmployeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightEmployeeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlightEmployeeDto: UpdateFlightEmployeeDto) {
    return this.flightEmployeeService.update(+id, updateFlightEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flightEmployeeService.remove(+id);
  }
}
