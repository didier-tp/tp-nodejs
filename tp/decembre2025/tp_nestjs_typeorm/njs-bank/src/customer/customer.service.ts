import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { CustomerEntity } from './entities/customer.entity';
import { CustomerL0Dto, CustomerL1Dto } from './dto/customer.dto';


@Injectable()
export class CustomerService {

    constructor(
        @InjectRepository(CustomerEntity) private customerRepository: Repository<CustomerEntity>,
        @InjectMapper() private readonly classMapper: Mapper,
      ) {}

      async findAll():Promise<CustomerL1Dto[]>{
        return this.classMapper.mapArrayAsync(await this.customerRepository.find(),
                                              CustomerEntity,CustomerL1Dto);
      }

    
      async findOne(id: number):Promise<CustomerL1Dto>{
        try{ 
           const customerEntity = await this.customerRepository.findOneBy({ id }); 
           if(customerEntity==null)
               throw new Error(`NOT_FOUND: customer not found with id=${id}`);
           else
               return this.classMapper.mapAsync(customerEntity,CustomerEntity,CustomerL1Dto);
        }catch(ex){
           const subErrorPrefix = (ex instanceof Error)?`${ex.message}:`:"";
           throw new Error(`${subErrorPrefix}exception in CustomerService.findOne() with id=${id}`);
        }
       }

      async create(customerDto: CustomerL0Dto): Promise<CustomerL1Dto> {
        const customerToCreate = customerDto; // compatible in simple case , more simple/efficient
        //const customerToCreate = this.classMapper.map(customerDto,CustomerL0Dto,CustomerEntity); //ok
        const savedCustomerAsEntity = await this.customerRepository.save(customerToCreate);
        return this.classMapper.mapAsync(savedCustomerAsEntity,CustomerEntity,CustomerL1Dto);
      }

      async _throwNotFoundErrorInNotExists(id:number,messagePart:string){
        const doesExit = await this.customerRepository.exists({ where: { id: id } });
           if(!doesExit)
               throw new Error(`NOT_FOUND: ${messagePart} with id=${id}`);
      }

      async remove(id: number): Promise<boolean>{
        await this._throwNotFoundErrorInNotExists(id,"no existing customer to delete");
        try{ 
          const deletedResult = await this.customerRepository.delete(id); //deletedResult
          //console.log("deletedResult=" + JSON.stringify(deletedResult));
          return (deletedResult.affected===1);
        }catch(ex){
          const subErrorPrefix = (ex instanceof Error)?`${ex.message}:`:"";
         throw new Error(`${subErrorPrefix}Exception in CustomerService.remove() with id==${id}`);
        }
      }

  

    async update(id:number , dto : CustomerL1Dto): Promise<boolean> {
      await this._throwNotFoundErrorInNotExists(id,"no existing customer to update");
      try{ 
          const customerToUpdate = dto; // compatible in simple case , more simple/efficient
          //const customerToUpdate = this.classMapper.map(dto,CustomerL1Dto,CustomerEntity); //ok
          const updateResult =  await this.customerRepository.update(id, customerToUpdate);
          console.log("updateResult="+JSON.stringify(updateResult)); //no updatedEntity , just affected
          return (updateResult.affected===1);
      }catch(ex){
        const subErrorPrefix = (ex instanceof Error)?`${ex.message}:`:"";
         throw new Error(`${subErrorPrefix}Exception in CustomerService.update() with id==${id}`);
      }
    }
}


//**************** OLD CODE */
/*
 constructor(
        @InjectRepository(CustomerEntity) private customerRepository: Repository<CustomerEntity>,
        @InjectMapper() private readonly classMapper: Mapper,
      ) {}

      async findAll():Promise<CustomerL1Dto[]>{
        const customerEntityArray  : CustomerEntity[] = await this.customerRepository.find();
        return this.classMapper.mapArrayAsync(customerEntityArray,CustomerEntity,CustomerL1Dto);
      }
    
      async findOne(id: number):Promise<CustomerL1Dto>{
        try{ 
           const customerEntity = await this.customerRepository.findOneBy({ id }); 
           if(customerEntity==null)
               throw new Error(`NOT_FOUND: customer not found with id=${id}`);
           else
               return this.classMapper.mapAsync(customerEntity,CustomerEntity,CustomerL1Dto);
        }catch(ex){
           throw new Error(`exception in CustomerService.findOne() with id=${id}`);
        }
       }

      async remove(id: number): Promise<boolean>{
        const doesNewsExit = await this.customerRepository.exists({ where: { id: id } });
        if(!doesNewsExit)
          throw new Error(`NOT_FOUND: not existing customer to delete with id==${id}`);
       
        try{ 
          const deletedResult = await this.customerRepository.delete(id); //deletedResult
          //console.log("deletedResult=" + JSON.stringify(deletedResult));
          return (deletedResult.affected===1);
        }catch(ex){
         throw new Error(`Exception in CustomerService.remove() with id==${id}`);
        }
      }

      async create(customerDto: CustomerL0Dto): Promise<CustomerL1Dto> {
        const customerToCreate = customerDto; // compatible , more simple
        //const customerToCreate = this.classMapper.map(customerDto,CustomerL0Dto,CustomerEntity); //ok
        const savedCustomerAsNewsEntity = await this.customerRepository.save(customerToCreate);
        return this.classMapper.mapAsync(savedCustomerAsNewsEntity,CustomerEntity,CustomerL1Dto);
    }

    
    //basic version:
     // async update(id:number , c : CustomerL1Dto): Promise<CustomerL1Dto> {
      // await this.customerRepository.update(id,c);
       // return c;
     // }
    

      async update(id:number , dto : CustomerL1Dto): Promise<CustomerL1Dto> {
        const doesNewsExit = await this.customerRepository.exists({ where: { id: id } });
        if(!doesNewsExit)
            throw new Error(`NOT_FOUND: not existing customer to update with id==${id}`);
        try{ 
            const customerToUpdate = dto; // compatible , more simple
            //const customerToUpdate = this.classMapper.map(dto,CustomerL1Dto,CustomerEntity); //ok
            const updateResult =  await this.customerRepository.update(id, customerToUpdate);
            console.log("updateResult="+JSON.stringify(updateResult)); //no updatedNewsAsNewsEntity , just raw.modifiedCount
            return this.findOne(id);
        }catch(ex){
           throw new Error(`Exception in CustomerService.update() with id==${id}`);
        }
      }

*/


//**************** VERY OLD CODE */

  /*
  public method should have abstract/interface/agnostic types (return value and parameters)
  it can match any compatible plain object (or instance of compatible classe)
  ------
  private code handles XyzEntity type (of typeorm)
  */

/*
    constructor(
        @InjectRepository(CustomerEntity) private customerRepository: Repository<CustomerEntity>,
        @InjectMapper() private readonly classMapper: Mapper,
      ) {}
    
      async findAll(): Promise<Customer[]> {
        let custArray : CustomerEntity[] | null;
        custArray = await this.customerRepository.find();
        return custArray;
      }
    
      findOne(id: number): Promise<Customer | null> {
        return this.customerRepository.findOneBy({ id });
      }
    
      async remove(id: number): Promise<void> {
        await this.customerRepository.delete(id);
      }

      async create(c : Customer): Promise<Customer> {
        //console.log("customerService.create() called with c="+JSON.stringify(c))
        const insertRes =  await this.customerRepository.insert(c);
        //console.log("customerService.create() called with insertRes="+JSON.stringify(insertRes))
        c.id = Number(insertRes.generatedMaps[0]["id"]);
        return c;
      }

      async update(id:number , c : Customer): Promise<Customer> {
        await this.customerRepository.update(id,c);
        return c;
      }
*/