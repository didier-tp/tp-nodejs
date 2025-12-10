import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { CustomerMapperProfile } from './mapper/customer.mapper.profile';
import { CustomerL0Dto, CustomerL1Dto } from './dto/customer.dto';

//npm run test -t customer.service.spec

describe('CustomerService', () => {
  let service: CustomerService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [CustomerService , CustomerMapperProfile],
      imports: [
        AutomapperModule.forRoot(  {    strategyInitializer: classes()  } ), 
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'root',
          database: 'nestJsBankDb',
          entities: [CustomerEntity]
        }),
        TypeOrmModule.forFeature([CustomerEntity])
      ]
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('customer crud', async () => {
    //1. create and save a new customer
    let c= new CustomerL0Dto(); c.firstname="prenom1"; c.lastname="nom1"; 
    const createdCustomer : CustomerL1Dto = await service.create(c);
    const cId=createdCustomer.id??0;
    console.log("cId="+cId);

    //retreive/query it to check insertion
    let cRelu = await service.findOne(cId);
    console.log("cRelu="+JSON.stringify(cRelu))
    expect(cRelu.id).toBe(cId);
    expect(cRelu.firstname).toBe("prenom1");
    expect(cRelu.lastname).toBe("nom1");

    //2. update some customer values
    if(cRelu){
    cRelu.firstname="prenom_1";
    cRelu.lastname="Nom_1";
    await service.update(cId,cRelu);
    }

    //retreive/query it to check update
    let cRelu2 = await service.findOne(cId);
    console.log("cRelu2 after update="+JSON.stringify(cRelu2))
    expect(cRelu2.id).toBe(cId);
    expect(cRelu2.firstname).toBe("prenom_1");
    expect(cRelu2.lastname).toBe("Nom_1");

    //3. delete customer 
    await service.remove(cId);

    //try to retreive it to check delete
    try{
      let cRelu3 = await service.findOne(cId);
     expect(true).toBe(false);//fail workaround
    }catch(expectedException){
        expect(expectedException).toBeInstanceOf(Error);
        expect((<Error>expectedException).message).toContain('NOT_FOUND');
        console.log("excepted exception if not found:" + expectedException);
    }
  });

  afterEach(async () => {
    module.close();
  });

});
