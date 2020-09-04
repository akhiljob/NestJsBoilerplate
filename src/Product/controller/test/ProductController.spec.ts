import { ProductController } from '../ProductController';
import { ProductServiceImpl } from '../../service/ProductServiceImpl';
import { ProductRepository } from '../../repository/ProductRepository';

describe('ProductController', () => {
  let productController: ProductController;
  let productService: ProductServiceImpl;
  let productRepository: ProductRepository;

  beforeEach(() => {
    productRepository = new ProductRepository();
    productService = new ProductServiceImpl(productRepository);
    productController = new ProductController(productService);
  });

  describe('get All Products', () => {
    it('should return an array of products', async () => {
      const mockResult = [{ name: 'mockProduct' }];
      jest
        .spyOn(productRepository, 'getAllProducts')
        .mockImplementation(async () => mockResult);

      expect(await productController.getAllProducts()).toBe(mockResult);
    });
  });
});
