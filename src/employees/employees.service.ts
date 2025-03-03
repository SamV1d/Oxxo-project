import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { throwIfEmpty } from 'rxjs';
import { v4 as uuid} from "uuid";
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {

 constructor(
  @InjectRepository(Employee)
  private employeeRepository : Repository<Employee>
 ){}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee =  await this.employeeRepository.save(createEmployeeDto)
    return employee;
  }

  findAll() {
  
    return this.employeeRepository.find();
  }

  findOne(id: string) {
   const employee = this.employeeRepository.findOneBy({
    employeeid: id
   })
   return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeid: id,
      ...updateEmployeeDto
    });
  
    if (!employeeToUpdate) {
      throw new Error(`Employee with ID ${id} not found`);
    }
  
    return await this.employeeRepository.save(employeeToUpdate);
  }
  

  remove(id: string) {
   this.employeeRepository.delete({
    employeeid: id
   })
   return{
    message: "Empleado eliminado"
   }
  }
}
