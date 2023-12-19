import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), OrderModule, ProductModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
