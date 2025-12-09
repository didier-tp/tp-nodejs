import { Mapper, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { CustomerL0Dto, CustomerL1Dto } from "../dto/customer.dto";
import { CustomerEntity } from "../entities/customer.entity";


@Injectable()
export class CustomerMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, CustomerL0Dto,CustomerEntity);
      createMap(mapper, CustomerL1Dto,CustomerEntity);
      createMap(mapper, CustomerEntity,CustomerL1Dto/* ,
          forMember( d=> d.id, mapFrom(s => s.id))*/
        );
    };
  }
}