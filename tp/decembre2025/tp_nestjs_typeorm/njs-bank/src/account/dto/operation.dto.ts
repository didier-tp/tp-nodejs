import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { AccountL0Dto } from "./account.dto";

//NB: @ApiProperty() est nécessaire pour une bonne compréhension du schema/DTO par swagger
export class OperationL0Dto {
    @ApiProperty()
    @AutoMap()
    label: string;

    @ApiProperty()
    @AutoMap()
    amount: number;

    @ApiProperty()
    @AutoMap()
    opDateTime:Date;

    @ApiProperty()
    //@AutoMap()
    accountId?:number;
  
  }

  export class OperationL1Dto extends  OperationL0Dto{
    @ApiProperty()
    @AutoMap()
    id?: number;

    
  }

  export class OperationL2Dto extends  OperationL1Dto{
    @ApiProperty({required:false})
    @AutoMap()
    account?:AccountL0Dto;
  }