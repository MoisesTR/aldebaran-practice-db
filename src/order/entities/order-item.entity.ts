import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productId: number;

    @Column()
    orderId: number;

    @Column()
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @ManyToOne(() => Order, order => order.items)
    @JoinColumn({ name: 'orderId' })
    order: Order;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product: Product;
}
