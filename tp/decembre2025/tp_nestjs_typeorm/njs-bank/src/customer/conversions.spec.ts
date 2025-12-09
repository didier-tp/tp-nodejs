import { classToPlain, instanceToPlain, plainToClass, serialize } from "class-transformer";
import { CustomerDto, CustomerDtoBis, CustomerDtoEx, CustomerDtoTer } from "./customer.dto";

//npm run test -t conversions.spec

describe('conversions', () => {
  it('convert plain object to CustomerDto instance',()=>{
    const custObj = { id : 123 , firstname : 'jean' , lastname : 'Bon' , email : 'jean.bon@xyz.com' };
    let custDto = plainToClass(CustomerDtoEx, custObj);
    //dans le sens inverse: instanceToPlain(custDto) 
    //et classToClass(custDto) permet un clonage en profondeur
    console.log("custDto=" + JSON.stringify(custDto) + " custDto.asGlobalString()="  + custDto.asGlobalString() )
    expect( typeof custDto).toBe("object");
    expect(custDto instanceof CustomerDtoEx).toBe(true);
  })

  it('convert CustomerDtoBis instance to plain object',()=>{
    const custDtoBis =  new CustomerDtoBis( 123 ,  'jean' ,  'Bon' );
    let custObj = instanceToPlain(custDtoBis); /* classToPlain(custDtoBis) = old deprecated method name */
    console.log("custObj=" + JSON.stringify(custObj) );
    //and vice versa
    let custDtoBis2 = plainToClass(CustomerDtoBis,custObj);
    console.log("custDtoBis2=" + JSON.stringify(custDtoBis2) + " custDtoBis2.asGlobalString()="  + custDtoBis2.asGlobalString() )
  })

  it('convert CustomerDtoTer instance seen as plain object to instance of CustomerDtoBis ',()=>{
    const custDtoTer =  new CustomerDtoTer( 123 ,  'jean' ,  'Bon' );
    console.log("custDtoTer=" + JSON.stringify(custDtoTer) );
    console.log("custDtoTer as plain=" + JSON.stringify(instanceToPlain(custDtoTer)) );
    let custDtoBis = plainToClass(CustomerDtoBis,custDtoTer);
    console.log("custDtoBis=" + JSON.stringify(custDtoBis) + " custDtoBis.asGlobalString()="  + custDtoBis.asGlobalString() )
  })

})