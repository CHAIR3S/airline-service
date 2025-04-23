import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt } from 'class-validator';

export class CreateEmployeeShiftDto {
  @ApiProperty()
  @IsInt()
  employeeId: number;

  @ApiProperty()
  @IsDateString()
  shiftStart: string;

  @ApiProperty()
  @IsDateString()
  shiftEnd: string;

  @ApiProperty({ default: true })
  @IsBoolean()
  available: boolean;
}
