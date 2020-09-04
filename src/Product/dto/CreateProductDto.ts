import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly code: string;
  @ApiProperty({ required: false })
  readonly description: string;
}
