import { UpdateProductDto } from '../dto/UpdateProductDto';
import { CreateProductDto } from '../dto/CreateProductDto';
export interface ProductService {
  getProducts(): Promise<any>;
  createProduct(productInfo: CreateProductDto): Promise<any>;
  deleteProduct(): Promise<any>;
  updateProduct(updateProductInfo: UpdateProductDto): Promise<any>;
}
