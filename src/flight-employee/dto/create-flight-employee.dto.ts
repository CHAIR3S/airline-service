import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateFlightEmployeeDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  flightId: number;

  @ApiProperty({ example: 5 })
  @IsInt()
  employeeId: number;

  @ApiProperty({ example: 'COPILOT' })
  @IsString()
  @IsNotEmpty()
  flightRole: string;
}
