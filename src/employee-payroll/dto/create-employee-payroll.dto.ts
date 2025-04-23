import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsPositive } from 'class-validator';

export class CreateEmployeePayrollDto {
  @ApiProperty()
  @IsNumber()
  employeeId: number;

  @ApiProperty({ example: '2025-04-01' })
  @IsDateString()
  periodStart: string;

  @ApiProperty({ example: '2025-04-15' })
  @IsDateString()
  periodEnd: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  hoursWorked: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  totalPayment: number;
}
