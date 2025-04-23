import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty()
  @IsInt()
  reservationId: number;

  @ApiProperty({ example: 'ABC123XYZ987' })
  @IsString()
  barcode: string;
}
