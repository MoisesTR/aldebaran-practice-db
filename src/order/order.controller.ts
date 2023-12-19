import { Controller, Post, Body, ParseIntPipe, Param, Get } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get(":id")
  async getOrder(@Param("id", ParseIntPipe) id: number) {
    return this.orderService.findOneById(id);
  }

}
