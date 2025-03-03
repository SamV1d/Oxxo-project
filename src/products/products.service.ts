import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from 'uuid';

@Injectable()
export class ProductsService {

  private products: CreateProductDto[]=[
    {
        productId: uuid(),
        product: "Sabritas Normal",
        price: 29,
        countSeal: 3,
        provider: uuid()
    },
    {
      productId: uuid(),
      product: "Coca Cola 600ml",
      price: 40,
      countSeal: 2,
      provider: uuid()
    },
    {
      productId: uuid(),
      product: "Agua Ciel 1L",
      price: 15,
      countSeal: 2,
      provider: uuid()
    }
  ]
  create(createProductDto: CreateProductDto) {
    if(!createProductDto.productId) createProductDto.productId = uuid ()
    createProductDto.productId= uuid();
    this.products.push(createProductDto)
    return createProductDto;
  }

  findAll() {
   return this.products;
  }

  findOne(id: string) {
    const productFound= this.products.filter((product)=>product.productId==id)[0]
    if(!productFound)throw new NotFoundException()
    return productFound;
    
  }

  findByProvider(id: string){
    const productFound = this.products.filter((product)=>product.provider==id)
    if(productFound.length==0)throw new NotFoundException()
    return productFound;
    
  }

  update(id: string, updateProductDto: UpdateProductDto) {
   let product = this.findOne(id);
   this.products= this.products.map((product)=>{
    if(product.productId== id)
      return{
        ...product,
        ...updateProductDto
      }
      return product;
   })
   product = {
    ...product,
    ...updateProductDto,
   }
   return product
  }

  remove(id: string) {
    const {productId}= this.findOne(id)
    this.products = this.products.filter((product)=>product.productId!= productId)
    return this.products;
  }
}
