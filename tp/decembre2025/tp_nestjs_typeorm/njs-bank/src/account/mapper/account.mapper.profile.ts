import { Mapper, createMap, forMember, mapFrom } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { AccountEntity } from "../entities/account.entity";
import { AccountL0Dto, AccountL1Dto } from "../dto/account.dto";
import { OperationL0Dto, OperationL1Dto } from "../dto/operation.dto";
import { OperationEntity } from "../entities/operation.entity";

@Injectable()
export class AccountMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, AccountL0Dto,AccountEntity);
      createMap(mapper, AccountL1Dto,AccountEntity);
      createMap(mapper, AccountEntity,AccountL1Dto);
      createMap(mapper, OperationL0Dto,OperationEntity);
      createMap(mapper, OperationL1Dto,OperationEntity);
      createMap(mapper, OperationEntity,OperationL1Dto        ,
        forMember( d=> d.accountId, mapFrom(s => s.account?.num))
      );
    };
  }
}