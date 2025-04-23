import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 2 })
  @IsNumber()
  positionId: number;

  @ApiProperty({ example: 50000 })
  @IsNumber()
  @IsPositive()
  salary: number;
}
