//NB: @ApiProperty() est nécessaire pour une bonne compréhension du schema/DTO par swagger

import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { CustomerL1Dto } from "src/customer/dto/customer.dto";

export class AccountL0Dto {
    @ApiProperty({default:'myAccount'})
    @AutoMap()
    label: string;

    @ApiProperty({default:'myAccount'})
    @AutoMap()
    balance: number;
  }

 export class AccountL1Dto extends AccountL0Dto {
    @ApiProperty()
    @AutoMap()
    num?: number;
  }

 