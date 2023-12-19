import { IsIn, IsNumber } from "class-validator";
import { PaymentStatus } from "../types/payment.enum";

export class CreatePaymentDto {
    
    @IsNumber()
    orderId: number;

    @IsIn(Object.values(PaymentStatus))
    status: PaymentStatus;
}