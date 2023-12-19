import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  findOneById(productId: number): Promise<Product> {
    return this.productRepository.findOne({
      where: {
        id: productId,
      },
    });
  }

  async updateInventory(
    productId: number,
    quantityChange: number,
  ): Promise<void> {
    await this.productRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const product = await transactionalEntityManager.findOne(Product, {
          where: { id: productId },
          lock: { mode: 'pessimistic_write' },
        });

        if (!product) {
          throw new Error('Product not found');
        }

        if (product.inventoryCount + quantityChange < 0) {
          throw new Error('Insufficient inventory');
        }

        product.inventoryCount += quantityChange;
        await transactionalEntityManager.save(product);
      },
    );
  }

  async restockProduct(
    productId: number,
    quantity: number,
  ): Promise<void> {
    await this.productRepository.manager.transaction(
      'REPEATABLE READ',
      async (manager) => {
        const product = await manager.findOne(Product, {
          where: {
            id: productId,
          },
        });

        product.inventoryCount += quantity;
        await manager.save(product);
      },
    );
  }

  public async purchaseProduct(
    productId: number,
    quantity: number,
  ): Promise<void> {
    await this.productRepository.manager.transaction(
      'REPEATABLE READ',
      async (manager) => {
        const product = await manager.findOne(Product, {
          where: {
            id: productId,
          },
        });

        if (!product || product.inventoryCount < quantity) {
          throw new Error('Product unavailable or insufficient inventory');
        }

        product.inventoryCount -= quantity;
        await manager.save(product);
      },
    );
  }
}
