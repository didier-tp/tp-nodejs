import { Body ,ClassSerializerInterceptor,Controller,Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Message } from 'src/common/message';
import { ApiResponse } from '@nestjs/swagger';
import { ErrorExceptionFilter, HttpExceptionFilter } from 'src/common/error.exception.filter';
import { CustomerL0Dto, CustomerL1Dto } from './dto/customer.dto';


@Controller('customers')
@UseFilters(new ErrorExceptionFilter(),new HttpExceptionFilter())
export class CustomerController {

    constructor(private readonly customerService: CustomerService) {
    }

    @Get()
    //@UseInterceptors(ClassSerializerInterceptor)
    @ApiResponse({
        description : "collection of searched customers",
        type: [CustomerL1Dto],
      })
    async getCustomersByCriteria(): Promise<CustomerL1Dto[]> {
        return this.customerService.findAll();
    }

    @Get(':id')
    //@UseInterceptors(ClassSerializerInterceptor) //to interpret @Exlude , @Expose during json serialization
    async getCustomerById(@Param('id') id:number): Promise<CustomerL1Dto> {
        return this.customerService.findOne(id);
         //ErrorExceptionFilter may return NOT_FOUND if necessary
    }

    //{ "firstName" : "prenom_x" , "lastname" : "nom_y" }
    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() c: CustomerL0Dto): Promise<CustomerL1Dto> {
        //console.log("CustomerController.create() with c = " + JSON.stringify(c));
        console.log( 'In CustomerController.create() typeof c = ' + typeof c);
        if(c instanceof CustomerL0Dto) console.log("c is an instance of CustomerL0Dto if ValidationPipe with trnsform:true");
        else console.log("In CustomerController.create() c is a plain object");
        
        //NB: if( no transform: true in ValidationPipe ) 
        // CustomerDto is just a "virtual type (typescript compiler)" ,
        //it is interpret by swagger and ValidationPipe
        //at runtime phase : c is just a plainObject (result of JSON.parse())
        const createadCustomer = await this.customerService.create(c);
        return createadCustomer;
     }
  
     @Delete(':id')
     //@HttpCode(204) if no return json message
     async remove(@Param('id') id:number) {
       // console.log("CustomerController.delete() with id = " + id);
       const deletedOk = await this.customerService.remove(id);
       //console.log(`deletedOk=${deletedOk} in CustomerController.remove()`)
       return new Message("customer with id="+id + " is now deleted");//with default 200/OK
       //ErrorExceptionFilter may return NOT_FOUND if necessary
    }
  
    //{"id": "1" ,  "firstName" : "prenom_x" , "lastname" : "nom_y" }
    @Put(':id') //or Patch(":id")
    //@HttpCode(204) if no return json message
    async update(@Body() customerToUpdate: CustomerL1Dto, @Param('id') id:number): Promise<CustomerL1Dto> {
        console.log("CustomerController.update() with id = " + id 
                    + " and customerToUpdate = " + JSON.stringify(customerToUpdate));
        customerToUpdate.id=id; //must be coherent
        const updatedOk =   await this.customerService.update(id, customerToUpdate);
        console.log(`updatedOk=${updatedOk} in CustomerController.update()`)
        let updatedCustomer = await this.customerService.findOne(id);
        return updatedCustomer; //with default 200/ok
         //ErrorExceptionFilter may return NOT_FOUND if necessary
    }
}
