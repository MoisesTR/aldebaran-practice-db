import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
  Get,
  NotFoundException,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get(':productId')
  async getProduct(@Param('productId', ParseIntPipe) productId: number) {
    const product = await this.productService.findOneById(productId);

    if (!product) {
      throw new NotFoundException(`Product with id ${productId} Not found`);
    }

    return product;
  }

  @Patch('update-inventory/:productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateInventory(
    @Param('productId', ParseIntPipe) productId: number,
    @Query('quantityChange', ParseIntPipe) quantityChange: number,
  ) {
    const product = await this.productService.findOneById(productId);

    if (!product) {
      throw new NotFoundException(`Product with id ${productId} Not found`);
    }

    return this.productService.updateInventory(productId, quantityChange);
  }

  @Patch('restock-product/:productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async restockProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Query('quantity', ParseIntPipe) quantity: number,
  ) {
    return this.productService.restockProduct(productId, quantity);
  }

  @Patch('purchase-product/:productId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async purchaseProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Query('quantity', ParseIntPipe) quantity: number,
  ) {
    return this.productService.purchaseProduct(productId, quantity);
  }
}
