import Product from '../entity/Product';
import { getRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
@Injectable()
export class ProductRepository {
  public async getAllProducts(): Promise<any> {
    return await getRepository(Product).find({});
  }

  public async save(product: Product): Promise<any> {
    return await getRepository(Product).save(product);
  }

  public async update(id: number, product: Product): Promise<any> {
    return await getRepository(Product).update({ id }, product);
  }

  public async delete(productId: number): Promise<any> {
    return await getRepository(Product).delete(productId);
  }

  public async findById(productId: number): Promise<any> {
    return await getRepository(Product).find({ id: productId });
  }
}
