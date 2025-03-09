import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { privateEncrypt } from 'crypto';
import { Repository, Like } from 'typeorm';
import { throwError } from 'rxjs';

@Injectable()
export class ProvidersService {

  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>
  ){}
  create(createProviderDto: CreateProviderDto) {
   return this.providerRepository.save(createProviderDto)
  }

  findAll() {
    return this.providerRepository.find();
  }

  findOne(id: string) {
    return this.providerRepository.findOneBy({
      providerID : id
    });
  }

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const product = await this.providerRepository.preload({
      providerID: id,
      ...updateProviderDto
    });

    if (!product) {
      throw new Error(`Provider with ID ${id} not found`);
    }

    return await this.providerRepository.save(product);
}
 findOneByName(name: string){
 const provider= this.providerRepository.findBy({
   providerName: Like(`%${name}%`)
 })
  if(!provider) throw new NotFoundException()
  return provider;
 }

  remove(id: string) {
   this.providerRepository.delete({
    providerID: id
   })
  }
}
