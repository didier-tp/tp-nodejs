import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Exclude, Expose } from "class-transformer";
import { AutoMap } from "@automapper/classes";


//NB: @ApiProperty() est nécessaire pour une bonne compréhension du schema/DTO par swagger

export class CustomerL0Dto  {

  @ApiProperty({default:'myFirstname'})
  @IsNotEmpty()
  @AutoMap()
  //@Expose({name:"prenom"}) //ancien test temporaire
  public firstname: string;

  @ApiProperty({default:'myLastname'})
  @IsNotEmpty()
  @AutoMap()
  public lastname: string;

  @ApiProperty({required:false,default:'aaa.bbb@xyz.com'})
  @IsEmail()
  @AutoMap()
  //@Exclude()  //ancien test temporaire
  public email?: string;

  //@Expose({name:"mot_de_passe"})  //ancien test temporaire
  //public password? : string = "pwd007";

  constructor( firstname: string="myFirtname",lastname: string="myLastname",email:string ='aaa.bbb@xyz.com'){
    this.firstname=firstname; this.lastname=lastname;this.email=email
  }

  }

  export class CustomerL1Dto  extends CustomerL0Dto{
    @ApiProperty()
    @AutoMap()
    public id?:number;

    constructor( id:number,firstname: string,lastname: string,email:string ){
      super(firstname,lastname,email);
      this.id=id;
    }
  }

 

  

   //juste pour tester les fonctionnalités de class-transformer:
  export class CustomerDtoEx extends CustomerL1Dto{

    constructor( id:number,firstname: string,lastname: string,email:string ){
      super(id,firstname,lastname,email);
    }

    asGlobalString(){
      return `[${this.id}] ${this.firstname} ${this.lastname} (${this.email})`
    }

  }




  //juste pour tester les fonctionnalités de class-transformer:
  export class CustomerDtoBis{

    public id?:number;

    @Expose({name:'prenom'})
    public firstname: string;

    @Expose({name:'nom'})  //it's work 2way : plainToClass() and instanceToPlain()
    public lastname: string;

    @Exclude()
    public password : string = "secret";

    @Expose({name:'email'})
    //public getEmail(){   //its also ok 
    public get email(){
      return `${this.firstname}.${this.lastname}@xyz.com`;
    }

    constructor( id:number,firstname: string,lastname: string){
      this.id=id ; this.firstname=firstname; this.lastname=lastname;
    }

    asGlobalString(){
      return `[${this.id}] ${this.firstname} ${this.lastname} `;
    }
  }

   //juste pour tester les fonctionnalités de class-transformer:
  export class CustomerDtoTer{

    public id?:number;

    public prenom: string;

    @Exclude() //it's work 2way : plainToClass() and instanceToPlain() , but not JSON.stringify()
    public password : string = "007";


    public nom: string;

    
    constructor( id:number,prenom: string,nom: string){
      this.id=id ; this.prenom=prenom; this.nom=nom;
    }

    asGlobalString(){
      return `[${this.id}] ${this.prenom} ${this.nom} `;
    }
  }
