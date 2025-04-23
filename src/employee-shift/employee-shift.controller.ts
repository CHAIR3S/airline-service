import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeShiftService } from './employee-shift.service';
import { CreateEmployeeShiftDto } from './dto/create-employee-shift.dto';
import { UpdateEmployeeShiftDto } from './dto/update-employee-shift.dto';

@Controller('employee-shift')
export class EmployeeShiftController {
  constructor(private readonly employeeShiftService: EmployeeShiftService) {}

  @Post()
  create(@Body() createEmployeeShiftDto: CreateEmployeeShiftDto) {
    return this.employeeShiftService.create(createEmployeeShiftDto);
  }

  @Get()
  findAll() {
    return this.employeeShiftService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeShiftService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeShiftDto: UpdateEmployeeShiftDto) {
    return this.employeeShiftService.update(+id, updateEmployeeShiftDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeShiftService.remove(+id);
  }
}
