import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { EmployeePayrollService } from './employee-payroll.service';
import { CreateEmployeePayrollDto } from './dto/create-employee-payroll.dto';
// import { UpdateEmployeePayrollDto } from './dto/update-employee-payroll.dto';

@Controller('employee-payroll')
export class EmployeePayrollController {
  constructor(private readonly employeePayrollService: EmployeePayrollService) {}

  @Post()
  create(@Body() createEmployeePayrollDto: CreateEmployeePayrollDto) {
    return this.employeePayrollService.create(createEmployeePayrollDto);
  }

  @Get()
  findAll() {
    return this.employeePayrollService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeePayrollService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEmployeePayrollDto: UpdateEmployeePayrollDto) {
  //   return this.employeePayrollService.update(+id, updateEmployeePayrollDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeePayrollService.remove(+id);
  }
}
