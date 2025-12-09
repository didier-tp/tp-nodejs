import { ApiProperty } from "@nestjs/swagger";

//NB: @ApiProperty() est nécessaire pour une bonne compréhension du schema/DTO par swagger

export class TransferRequest {

  @ApiProperty()
  public amount:number;

  @ApiProperty()
  public debitAccountNumber: number;

  @ApiProperty()
  public creditAccountNumber: number;

    constructor( amount:number,debitAccountNumber: number,creditAccountNumber: number ){
      this.amount=amount; this.debitAccountNumber=debitAccountNumber; 
      this.creditAccountNumber=creditAccountNumber;
    }
  }

  export class TransferResponse {
    @ApiProperty()
    public amount:number;
  
    @ApiProperty()
    public debitAccountNumber: number;
  
    @ApiProperty()
    public creditAccountNumber: number;

    @ApiProperty()
    public status:boolean;

    @ApiProperty()
    public message:string;

    constructor(
      amount:number,
      debitAccountNumber: number,
      creditAccountNumber: number,
      status:boolean=true,
      message:string="transfer successfully done"){
        this.amount=amount; this.debitAccountNumber=debitAccountNumber; 
        this.creditAccountNumber=creditAccountNumber;
        this.status=status,
        this.message=message;
    }
    
  }  