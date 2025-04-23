import { Module } from '@nestjs/common';
import { EmployeePayrollService } from './employee-payroll.service';
import { EmployeePayrollController } from './employee-payroll.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeePayroll } from './entities/employee-payroll.entity';
import { Employee } from 'src/employee/entities/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeePayroll, Employee])],
  controllers: [EmployeePayrollController],
  providers: [EmployeePayrollService],
  exports: [EmployeePayrollService],
})
export class EmployeePayrollModule {}
