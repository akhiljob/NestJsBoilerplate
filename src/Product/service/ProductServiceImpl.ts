import { ProductRepository } from '../repository/ProductRepository';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/CreateProductDto';
import { plainToClass } from 'class-transformer';
import Product from '../entity/Product';
import { UpdateProductDto } from '../dto/UpdateProductDto';
@Injectable()
export class ProductServiceImpl {
  constructor(private productRepository: ProductRepository) {}

  public async getAllProducts(): Promise<any> {
    return await this.productRepository.getAllProducts();
  }

  public async createProduct(productInfo: CreateProductDto) : Promise<any> {
    const product = plainToClass(Product, {
      name: productInfo.name,
      code: productInfo.code,
      description: productInfo.description,
    });
    return await this.productRepository.save(product);
  }

  public async updateProduct(productInfo: UpdateProductDto) : Promise<any>{
    const product = plainToClass(Product, {
      name: productInfo.name,
      code: productInfo.code,
      description: productInfo.description,
    });
    return await this.productRepository.update(productInfo.id, product);
  }

  public async removeProduct(productId: number) : Promise<any> {
    return await this.productRepository.delete(productId);
  }
}
