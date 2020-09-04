import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
  UseGuards,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { ProductServiceImpl } from '../service/ProductServiceImpl';
import { CreateProductDto } from '../dto/CreateProductDto';
import { UpdateProductDto } from '../dto/UpdateProductDto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '../../Common/guards/AuthGuard';
import { AppException } from '../../Common/exceptions/AppException';
import { MainResponseCode } from '../../Common/constants/ResponseCode';
import { AppExceptionFilter } from '../../Common/filters/AppExceptionFilter';

@ApiTags('Products')
@UseFilters(AppExceptionFilter)
@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
  constructor(private productService: ProductServiceImpl) {}

  @ApiOperation({ summary: 'Get all Products' })
  @Get()
  async getAllProducts(): Promise<any> {
    return await this.productService.getAllProducts();
  }

  @ApiOperation({ summary: 'Create a Product' })
  @Post()
  async createProduct(@Body() productInfo: CreateProductDto): Promise<any> {
    return await this.productService.createProduct(productInfo);
  }

  @ApiOperation({ summary: 'Update a Product' })
  @Put(':id')
  async updateProduct(
    @Param('id') productId: number,
    @Body() updateProductInfo: UpdateProductDto,
  ): Promise<any> {
    if (Number(productId) !== updateProductInfo.id) {
        console.log(productId);
        console.log(updateProductInfo.id)
      throw new AppException(
        MainResponseCode.GENERAL_ERROR,
        'Mismatched Id in request body',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.productService.updateProduct(updateProductInfo);
  }

  @ApiOperation({ summary: 'Delete a Product' })
  @Delete(':id')
  async removeProduct(@Param('id') productId: number): Promise<any> {
    return await this.productService.removeProduct(productId);
  }
}
