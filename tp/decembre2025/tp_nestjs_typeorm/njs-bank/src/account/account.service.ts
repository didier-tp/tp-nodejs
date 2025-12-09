import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { AccountEntity } from './entities/account.entity';
import { OperationService } from 'src/account/operation.service';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { AccountL0Dto, AccountL1Dto } from './dto/account.dto';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity) private accountRepository: Repository<AccountEntity>,
        @InjectMapper() private readonly classMapper: Mapper,
        private operationService : OperationService
      ) {}

      async findAll():Promise<AccountL1Dto[]>{
        return this.classMapper.mapArrayAsync(await this.accountRepository.find(),
                                              AccountEntity,AccountL1Dto);
      }


      async findWithMinimumBalance(minimumBalance:number): Promise<AccountL1Dto[]> {
        const accountEntityArray = await this.accountRepository.find({
          where : {
            balance : MoreThanOrEqual(minimumBalance)
          }
         });
        return this.classMapper.mapArrayAsync(accountEntityArray,AccountEntity,AccountL1Dto);
      }

      //for n-n version:
      async findByOwnerId(ownerId:number): Promise<AccountL1Dto[]> {
        const accountEntityArray = await this.accountRepository.createQueryBuilder('account')
            .leftJoin('account.owners', 'owner')
            .where('owner.id = :ownerId', { ownerId: ownerId })
            .getMany();
        return this.classMapper.mapArrayAsync(accountEntityArray,AccountEntity,AccountL1Dto);
      }

      async findOne(num: number):Promise<AccountL1Dto>{
        try{ 
           const accountEntity = await this.accountRepository.findOneBy({num }); 
           if(accountEntity==null)
               throw new Error(`NOT_FOUND: account not found with num=${num}`);
           else
               return this.classMapper.mapAsync(accountEntity,AccountEntity,AccountL1Dto);
        }catch(ex){
           const subErrorPrefix = (ex instanceof Error)?`${ex.message}:`:"";
           throw new Error(`${subErrorPrefix}exception in AccountService.findOne() with num=${num}`);
        }
       }

      async doDebit(accountNum:number, amount:number ,opMessage:string){
        const a = await this.accountRepository.findOneBy({ num: accountNum });
       if(a){
         a.balance=a.balance - amount;
         await this.accountRepository.update(accountNum,a);
         await this.operationService.create({amount:-amount , label:opMessage , opDateTime : new Date() , accountId : a.num});
       }
      }

      async doCredit(accountNum:number, amount:number ,opMessage:string){
        const a = await this.accountRepository.findOneBy({ num: accountNum });
       if(a){
         a.balance=Number(a.balance) + Number(amount);
         await this.accountRepository.update(accountNum,a);
         await this.operationService.create({amount:amount , label:opMessage , opDateTime : new Date(), accountId : a.num});
       }
      }

      async create(accountDto: AccountL0Dto): Promise<AccountL1Dto> {
        const accountToCreate = accountDto; // compatible in simple case , more simple/efficient
        //const accountToCreate = this.classMapper.map(accountDto,AccountL0Dto,AccountEntity); //ok
        const savedAccountAsEntity = await this.accountRepository.save(accountToCreate);
        return this.classMapper.mapAsync(savedAccountAsEntity,AccountEntity,AccountL1Dto);
      }

      async _throwNotFoundErrorInNotExists(id:number,messagePart:string){
        const doesExit = await this.accountRepository.exists({ where: { num: id } });
           if(!doesExit)
               throw new Error(`NOT_FOUND: ${messagePart} with id=${id}`);
      }

      async remove(id: number): Promise<boolean>{
        await this._throwNotFoundErrorInNotExists(id,"no existing account to delete");
        try{ 
          const deletedResult = await this.accountRepository.delete(id); //deletedResult
          //console.log("deletedResult=" + JSON.stringify(deletedResult));
          return (deletedResult.affected===1);
        }catch(ex){
          const subErrorPrefix = (ex instanceof Error)?`${ex.message}:`:"";
         throw new Error(`${subErrorPrefix}Exception in AccountService.remove() with id==${id}`);
        }
      }

  

    async update(id:number , dto : AccountL1Dto): Promise<boolean> {
      await this._throwNotFoundErrorInNotExists(id,"no existing account to update");
      try{ 
          const accountToUpdate = dto; // compatible in simple case , more simple/efficient
          //const accountToUpdate = this.classMapper.map(dto,AccountL1Dto,AccountEntity); //ok
          const updateResult =  await this.accountRepository.update(id, accountToUpdate);
          console.log("updateResult="+JSON.stringify(updateResult)); //no updatedEntity , just affected
          return (updateResult.affected===1);
      }catch(ex){
        const subErrorPrefix = (ex instanceof Error)?`${ex.message}:`:"";
         throw new Error(`${subErrorPrefix}Exception in AccountService.update() with id==${id}`);
      }
    }
}

//******** OLD CODE */

/*
@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity)
        private accountRepository: Repository<AccountEntity>,
        private operationService : OperationService
      ) {}
    
      findAll(): Promise<Account[]> {
        return this.accountRepository.find();
      }

      findWithMinimumBalance(minimumBalance:number): Promise<Account[]> {
        return this.accountRepository.find({
          where : {
            balance : MoreThanOrEqual(minimumBalance)
          }
        });
      }

      //new n-n version:
      findByOwnerId(ownerId:number): Promise<Account[]> {
        return this.accountRepository.createQueryBuilder('account')
            .leftJoin('account.owners', 'owner')
            .where('owner.id = :ownerId', { ownerId: ownerId })
            .getMany();
      }

      async doDebit(accountNum:number, amount:number ,opMessage:string){
        const a = await this.accountRepository.findOneBy({ num: accountNum });
       if(a){
         a.balance=a.balance - amount;
         await this.accountRepository.update(a.num,a);
         await this.operationService.create({amount:-amount , label:opMessage , opDateTime : new Date()},a);
       }
      }

      async doCredit(accountNum:number, amount:number ,opMessage:string){
        const a = await this.accountRepository.findOneBy({ num: accountNum });
       if(a){
         a.balance=Number(a.balance) + Number(amount);
         await this.accountRepository.update(a.num,a);
         await this.operationService.create({amount:amount , label:opMessage , opDateTime : new Date()},a);
       }
      }
    
      findOne(num: number): Promise<Account | null> {
        return this.accountRepository.findOneBy({ num });
      }
    
      async remove(id: number): Promise<void> {
        await this.accountRepository.delete(id);
      }

      async create(a : Account): Promise<Account> {
        const insertRes =  await this.accountRepository.insert(a);
        a.num = Number(insertRes.generatedMaps[0]["num"]);
        return a;
      }

      async update(id:number , a : Account): Promise<Account> {
        await this.accountRepository.update(id,a);
        return a;
      }
}
*/

//******** VERY OLD CODE */

 /*
      //old n-1 version:
      findByOwnerId(ownerId:number): Promise<Account[]> {
        return this.accountRepository.find({
         // relations: {owner:true },
           where : {
                owner :{
                   id : ownerId
                }
            }
        });
      }
      */