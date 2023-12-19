import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { OrderItem } from '../entities/order-item.entity';
import { OrderItemDto } from './order-item.dto';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1, { message: 'At least one item is required' })
  @Type(() => OrderItemDto)
  items: OrderItem[];
}
