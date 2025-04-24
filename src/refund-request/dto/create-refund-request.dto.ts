import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { RefundStatus } from '../entities/refund-request.entity';

export class CreateRefundRequestDto {
  @ApiProperty()
  @IsInt()
  paymentId: number;

  @ApiProperty()
  @IsString()
  reason: string;

  @ApiProperty({ enum: RefundStatus })
  @IsEnum(RefundStatus)
  status: RefundStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  resolutionDate?: string;
}
