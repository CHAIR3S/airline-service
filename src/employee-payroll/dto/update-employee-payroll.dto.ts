import { PartialType } from '@nestjs/swagger';
import { CreateEmployeePayrollDto } from './create-employee-payroll.dto';

export class UpdateEmployeePayrollDto extends PartialType(CreateEmployeePayrollDto) {}
