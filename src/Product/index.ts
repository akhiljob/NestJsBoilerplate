import { Module } from '@nestjs/common';
import { ProductServiceImpl } from './service/ProductServiceImpl';
import { ProductController } from './controller/ProductController';
import { ProductRepository } from './repository/ProductRepository';
import { CommonModule } from '../Common/index';

@Module({
  imports: [CommonModule],
  controllers: [ProductController],
  providers: [ProductController, ProductServiceImpl, ProductRepository],
  exports: [ProductController],
})
export class ProductModule {}
