import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { PaymentStatus } from '../types/payment.enum';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.Pending,
  })
  status: PaymentStatus;
}
