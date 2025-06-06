import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefundRequest } from './entities/refund-request.entity';
import { Payment } from '../payment/entities/payment.entity';
import { RefundRequestService } from './refund-request.service';
import { RefundRequestController } from './refund-request.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RefundRequest, Payment])],
  controllers: [RefundRequestController],
  providers: [RefundRequestService],
  exports: [RefundRequestService],
})
export class RefundRequestModule {}
