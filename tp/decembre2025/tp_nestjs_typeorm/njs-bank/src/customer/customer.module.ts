import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerController } from "./customer.controller";
import { CustomerEntity } from "./entities/customer.entity";
import { CustomerService } from "./customer.service";
import { CustomerMapperProfile } from "./mapper/customer.mapper.profile";


@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerEntity])
  ],
  controllers: [CustomerController],
  providers: [CustomerService,CustomerMapperProfile],
})
export class CustomerModule {}
