import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(  @InjectRepository(Product)
  private productRepository: Repository<Product>){} 
 
  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto)

    return product;
  }

  findAll() {
   return this.productRepository.find();
  }

  findOne(id: string) {
   const product = this.productRepository.findOneBy(
    {
      productId: id,
    })
    if(!product) throw new NotFoundException()
    return product;
    
  }

  findByProvider(id: string){
    return "Ok"
    
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate =  await this.productRepository.preload(
      {
        productId: id,
        ...updateProductDto
      }
    )
    if(!productToUpdate) throw new NotFoundException()
    this.productRepository.save(productToUpdate)
    return productToUpdate;
  }

  remove(id: string) {
    this.findOne(id)
     this.productRepository.delete(
      {
        productId: id,
      }
    )
    return{
      message : `Objecto con id ${id} eliminado`
    }
  }
}
