import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(orderData: CreateOrderDto): Promise<Order> {
    return this.orderRepository.manager.transaction(
      'REPEATABLE READ',
      async (manager) => {
        const order = manager.create(Order, { ...orderData });
        await manager.save(order);

        for (const itemData of orderData.items) {
          const product = await this.productRepository.findOne({
            where: { id: itemData.productId },
          });

          if (!product) {
            throw new NotFoundException(
              `Product with ID ${itemData.productId} not found`,
            );
          }
          
          const orderItem = manager.create(OrderItem, {
            ...itemData,
            order: order,
          });
          await manager.save(orderItem);
        }

        return order;
      },
    );
  }

  async findOneById(id: number): Promise<Order> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });
  }
}
