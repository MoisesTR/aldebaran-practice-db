import { IsInt, IsPositive, Min, Max, IsDecimal, IsNumber } from 'class-validator';

export class OrderItemDto {
  @IsInt()
  @Min(1)
  productId: number;

  @IsInt()
  @Min(1)
  @IsPositive()
  quantity: number;

  @IsNumber()
  @Min(0.01)
  @Max(999999.99)
  price: number;
}
