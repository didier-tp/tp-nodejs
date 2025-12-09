import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual } from 'typeorm';
import { OperationEntity } from './entities/operation.entity';

import { AccountEntity } from 'src/account/entities/account.entity';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { OperationL1Dto, OperationL0Dto } from './dto/operation.dto';


@Injectable()
export class OperationService {
    constructor(
        @InjectRepository(OperationEntity) private operationRepository: Repository<OperationEntity> ,
        @InjectRepository(AccountEntity) private accountRepository: Repository<AccountEntity> ,
        @InjectMapper() private readonly classMapper: Mapper
      ) {}
    
      async findAll():Promise<OperationL1Dto[]>{
        return this.classMapper.mapArrayAsync(await this.operationRepository.find(),
                                              OperationEntity,OperationL1Dto);
      }

     async findByAccountNum(accountNum:number): Promise<OperationL1Dto[]> {
        const opEntityArray= await this.operationRepository.find({
           relations: {account:true }, //fetch operation with related/linked account
           where : {
                account :{
                   num : accountNum
                }
            }
        });
        return this.classMapper.mapArrayAsync(opEntityArray,OperationEntity,OperationL1Dto);
      }

      async findOne(id: number):Promise<OperationL1Dto>{
        try{ 
          // const operationEntity = await this.operationRepository.findOneBy({ id }); //fetch operation without related account
          const operationEntity = await this.operationRepository.findOne({
            relations: {account:true }, //fetch operation with related/linked account
             where : { id : id  } 
           });
           if(operationEntity==null)
               throw new Error(`NOT_FOUND: Operation not found with id=${id}`);
           else
               return this.classMapper.mapAsync(operationEntity,OperationEntity,OperationL1Dto);
        }catch(ex){
           const subErrorPrefix = (ex instanceof Error)?`${ex.message}:`:"";
           throw new Error(`${subErrorPrefix}exception in OperationService.findOne() with id=${id}`);
        }
       }

      async create(operationDto: OperationL0Dto): Promise<OperationL1Dto> {
        let operationToCreate = this.classMapper.map(operationDto,OperationL0Dto,OperationEntity); //ok
        const account = await this.accountRepository.findOneBy({num:operationDto.accountId});
        if(account)
            operationToCreate.account= account;
        const savedOperationAsEntity = await this.operationRepository.save(operationToCreate);
        return this.classMapper.mapAsync(savedOperationAsEntity,OperationEntity,OperationL1Dto);
      }

      async _throwNotFoundErrorInNotExists(id:number,messagePart:string){
        const doesExit = await this.operationRepository.exists({ where: { id: id } });
           if(!doesExit)
               throw new Error(`NOT_FOUND: ${messagePart} with id=${id}`);
      }


      async remove(id: number): Promise<boolean>{
        await this._throwNotFoundErrorInNotExists(id,"no existing Operation to delete");
        try{ 
          const deletedResult = await this.operationRepository.delete(id); //deletedResult
          //console.log("deletedResult=" + JSON.stringify(deletedResult));
          return (deletedResult.affected===1);
        }catch(ex){
          const subErrorPrefix = (ex instanceof Error)?`${ex.message}:`:"";
         throw new Error(`${subErrorPrefix}Exception in OperationService.remove() with id==${id}`);
        }
      }


    async update(id:number , dto : OperationL1Dto): Promise<boolean> {
      await this._throwNotFoundErrorInNotExists(id,"no existing Operation to update");
      try{ 
          const operationToUpdate = dto; // compatible in simple case , more simple/efficient
          //const operationToUpdate = this.classMapper.map(dto,OperationL1Dto,OperationEntity); //ok
          const updateResult =  await this.operationRepository.update(id, operationToUpdate);
          //console.log("updateResult="+JSON.stringify(updateResult)); //no updatedEntity , just affected
          return (updateResult.affected===1);
      }catch(ex){
        const subErrorPrefix = (ex instanceof Error)?`${ex.message}:`:"";
         throw new Error(`${subErrorPrefix}Exception in OperationService.update() with id==${id}`);
      }
    }

}

//************* OLD CODE */
/*

@Injectable()
export class OperationService {
    constructor(
        @InjectRepository(OperationEntity)
        private operationRepository: Repository<OperationEntity>
      ) {}
    
      findAll(): Promise<Operation[]> {
        return this.operationRepository.find();
      }

      findByAccountNum(accountNum:number): Promise<Operation[]> {
        return this.operationRepository.find({
         // relations: {account:true },
           where : {
                account :{
                   num : accountNum
                }
            }
        });
      }
    
      findOne(id: number): Promise<Operation | null> {
        return this.operationRepository.findOneBy({ id });
      }
    
      async remove(id: number): Promise<void> {
        await this.operationRepository.delete(id);
      }

      async create(op : Operation,account:Account): Promise<Operation> {
        (<OperationEntity> op).account=(<AccountEntity>account);
        const insertRes =  await this.operationRepository.insert(op);
        op.id = Number(insertRes.generatedMaps[0]["id"]);
        return op;
      }

      async update(id:number , op : Operation): Promise<Operation> {
        await this.operationRepository.update(id,op);
        return op;
      }
}
*/
