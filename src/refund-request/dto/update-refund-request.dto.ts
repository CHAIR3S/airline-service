import { PartialType } from '@nestjs/swagger';
import { CreateRefundRequestDto } from './create-refund-request.dto';

export class UpdateRefundRequestDto extends PartialType(CreateRefundRequestDto) {}
