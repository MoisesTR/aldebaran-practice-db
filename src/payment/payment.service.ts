import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { PaymentStatus } from './types/payment.enum';
import { CreatePaymentDto } from './dto/create-payment.dto';

export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  async create(payment: CreatePaymentDto): Promise<Payment> {
    return this.paymentRepository.save(payment);
  }

  async findById(paymentId: number): Promise<Payment> {
    return this.paymentRepository.findOne({
      where: {
        id: paymentId,
      },
    });
  }

  async updatePaymentStatus(
    paymentId: number,
    newStatus: PaymentStatus,
  ): Promise<void> {
    await this.paymentRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const payment = await transactionalEntityManager.findOne(Payment, {
          where: { id: paymentId },
          lock: { mode: 'pessimistic_read' },
        });

        if (!payment) {
          throw new Error('Payment not found');
        }

        payment.status = newStatus;
        await transactionalEntityManager.save(payment);
      },
    );
  }
}
