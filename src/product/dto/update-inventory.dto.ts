import { IsInt, Min } from 'class-validator';

export class UpdateInventoryDto {
  @IsInt()
  @Min(1)
  productId: number;

  @IsInt()
  @Min(1)
  quantityChange: number;
}
