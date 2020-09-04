import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column({ default: '' })
  description: string;

  @CreateDateColumn()
  public createdAt: Date ;

  @UpdateDateColumn()
  public updatedAt: Date;
}

export default Product;
