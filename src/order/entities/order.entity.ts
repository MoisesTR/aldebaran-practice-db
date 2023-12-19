import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;


  @OneToMany(() => OrderItem, orderItem => orderItem.order)
  items: OrderItem[];
}
