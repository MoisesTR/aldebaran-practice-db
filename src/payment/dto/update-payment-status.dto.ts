import { IsIn } from "class-validator";
import { PaymentStatus } from "../types/payment.enum";

export class UpdatePaymentStatusDto {

    @IsIn(Object.values(PaymentStatus))
    status: PaymentStatus;
}