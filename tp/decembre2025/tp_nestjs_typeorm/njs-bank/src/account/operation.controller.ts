import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseFilters } from '@nestjs/common';
import { OperationService } from './operation.service';
import { ApiResponse } from '@nestjs/swagger';
import { ErrorExceptionFilter, HttpExceptionFilter } from 'src/common/error.exception.filter';
import { OperationL0Dto, OperationL1Dto } from './dto/operation.dto';
import { Message } from 'src/common/message';

@Controller('operations')
@UseFilters(new ErrorExceptionFilter(),new HttpExceptionFilter())
export class OperationController {
    constructor(private readonly operationService: OperationService) {
    }

    // .../bank-api/operations --> all accounts
    // .../bank-api/operations?accountNum=1
    @Get()
      //@UseInterceptors(ClassSerializerInterceptor)
      @ApiResponse({
        description : "collection of searched operations",
        type: [OperationL1Dto],
      })
    async getOperationsByCriteria(@Query('accountNum') accountNum : number|undefined ): Promise<OperationL1Dto[]> {
        let operationsArray = undefined;
        if(accountNum) operationsArray=await this.operationService.findByAccountNum(accountNum);
        else operationsArray = await this.operationService.findAll();
        return operationsArray;
    }

    @Get(':id')
     //@UseInterceptors(ClassSerializerInterceptor) //to interpret @Exlude , @Expose during json serialization
    async getOperationById(@Param('id') id:number): Promise<OperationL1Dto> {
        return await this.operationService.findOne(id);
         //ErrorExceptionFilter may return NOT_FOUND if necessary
    }

    //{ "label" : "opAchatXxx" , "amount" : -5 , "opDateTime" : "2024-12-31 ..." , "accountId" : 1 }
    @Post()
    //@UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() op: OperationL0Dto): Promise<OperationL1Dto> {
        //console.log("OperationController.create() with op = " + JSON.stringify(op));
        const createadOperation = await this.operationService.create(op);
        return createadOperation;
     }
  
     @Delete(':id')
     //@HttpCode(204) if no return json message
     async remove(@Param('id') id:number) {
       // console.log("OperationController.delete() with id = " + id);
       const deletedOk = await this.operationService.remove(id);
       //console.log(`deletedOk=${deletedOk} in OperationController.remove()`)
       return new Message("operation with id="+id + " is now deleted");//with default 200/OK
       //ErrorExceptionFilter may return NOT_FOUND if necessary
    }
  
    //{ "id" : 2 , "label" : "opAchatXxx" , "amount" : -5 , "opDateTime" : "2024-12-31 ..." , "accountId" : 1 }
    @Put(':id') //or Patch(":id")
    //@HttpCode(204) if no return json message
    async update(@Body() operationToUpdate: OperationL1Dto, @Param('id') id:number): Promise<OperationL1Dto> {
        /*console.log("OperationController.update() with id = " + id 
                    + " and operationToUpdate = " + JSON.stringify(operationToUpdate));*/
        operationToUpdate.id=id; //must be coherent
        const updatedOk =   await this.operationService.update(id, operationToUpdate);
        //console.log(`updatedOk=${updatedOk} in OperationController.update()`)
        let updatedOperation = await this.operationService.findOne(id);
        return updatedOperation; //with default 200/ok
         //ErrorExceptionFilter may return NOT_FOUND if necessary
    }
}
