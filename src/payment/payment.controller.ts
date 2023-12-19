import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) paymentId: number) {
    return this.paymentService.findById(paymentId);
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.NO_CONTENT)
  updatePaymentStatus(
    @Param('id', ParseIntPipe) paymentId: number,
    @Body() updatePaymentStatusDto: UpdatePaymentStatusDto,
  ) {
    return this.paymentService.updatePaymentStatus(
      paymentId,
      updatePaymentStatusDto.status,
    );
  }
}
