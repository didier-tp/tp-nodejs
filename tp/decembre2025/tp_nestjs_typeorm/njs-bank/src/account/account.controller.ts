import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseFilters } from '@nestjs/common';
import { AccountService } from './account.service';
import { Message } from 'src/common/message';
import { ApiResponse } from '@nestjs/swagger';
import { AccountL0Dto, AccountL1Dto } from './dto/account.dto';
import { ErrorExceptionFilter, HttpExceptionFilter } from 'src/common/error.exception.filter';

@Controller('accounts')
@UseFilters(new ErrorExceptionFilter(),new HttpExceptionFilter())
export class AccountController {
    constructor(private readonly accountService: AccountService) {
    }

    // .../bank-api/accounts --> all accounts
    // .../bank-api/accounts?minimumBalance=0 
    // .../bank-api/accounts?ownerId=1
    @Get()
    //@UseInterceptors(ClassSerializerInterceptor)
   
    @ApiResponse({
        description : "collection of searched accounts",
        type: [AccountL1Dto],
      })
        
    async getAccountsByCriteria(@Query('minimumBalance') minimumBalance : number|undefined  , 
                                @Query('ownerId') ownerId : number|undefined ): Promise<AccountL1Dto[]> {
        let aArray = null;
        if(minimumBalance) aArray=await this.accountService.findWithMinimumBalance(minimumBalance);
        else if(ownerId) aArray=await this.accountService.findByOwnerId(ownerId);
        else aArray=await this.accountService.findAll();
        return aArray;
    }
    
    @Get(':id')
    async getCustomerById(@Param('id') num:number): Promise<AccountL1Dto> {
        return this.accountService.findOne(num);
        //ErrorExceptionFilter may return NOT_FOUND if necessary
    }

    //{ "label" : "compte_xyz" , "balance" : 0 }
    @Post()
    async create(@Body() a: AccountL0Dto): Promise<AccountL1Dto> {
        //console.log("AccountController.create() with a = " + JSON.stringify(a));
        const createadAccount = await this.accountService.create(a);
        return createadAccount;
     }
  
     @Delete(':id')
     async remove(@Param('id') id:number): Promise<any> {
        //console.log("AccountController.delete() with id = " + id);
       const deleteOk = await this.accountService.remove(id);
      //console.log(`deletedOk=${deletedOk} in AccountController.remove()`)
      return new Message("account with id="+id + " is now deleted");//with default 200/OK
      //ErrorExceptionFilter may return NOT_FOUND if necessary
    }
  
    //{"num": "1" ,  "label" : "compte_xyz" , "balance" : 0 }
    @Put(':id')
    async update(@Body() accountToUpdate: AccountL1Dto, @Param('id') id:number): Promise<AccountL1Dto> {
        console.log("AccountController.update() with id = " + id 
                    + " and accountToUpdate = " + JSON.stringify(accountToUpdate));
        accountToUpdate.num=id; //must be coherent
        const updatedOk =   await this.accountService.update(id, accountToUpdate);
        console.log(`updatedOk=${updatedOk} in AccountController.update()`)
        let updatedAccount = await this.accountService.findOne(id);
        return updatedAccount; //with default 200/ok
         //ErrorExceptionFilter may return NOT_FOUND if necessary
    }
}
