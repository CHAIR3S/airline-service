import { Module } from '@nestjs/common';
import { EmployeeShiftService } from './employee-shift.service';
import { EmployeeShiftController } from './employee-shift.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/employee/entities/employee.entity';
import { EmployeeShift } from './entities/employee-shift.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeShift, Employee])],
  controllers: [EmployeeShiftController],
  providers: [EmployeeShiftService],
  exports: [EmployeeShiftService],
})
export class EmployeeShiftModule {}
