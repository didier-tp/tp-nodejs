import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountController } from "./account.controller";
import { AccountEntity } from "./entities/account.entity";
import { AccountService } from "./account.service";
import { CustomerModule } from "src/customer/customer.module";
import { TransferController } from "./transfer.controller";
import { TransferService } from "./transfer.service";
import { OperationController } from "./operation.controller";
import { OperationEntity } from "./entities/operation.entity";
import { OperationService } from "./operation.service";
import { AccountMapperProfile } from "./mapper/account.mapper.profile";



@Module({
  imports: [ CustomerModule,
    TypeOrmModule.forFeature([AccountEntity , OperationEntity])
  ],
  controllers: [AccountController, OperationController ,TransferController],
  providers: [AccountService ,OperationService, TransferService ,AccountMapperProfile],
})
export class AccountModule {}

//NB1: pour éviter des dépendances circulaires ou bien très complexes,
//la partie "operation" est placée dans ce meme module plutôt que dans un autre module

//NB2: transfer/virement pourrait éventuellement être placé dans un autre module "transfer"
//pour cela il faudrait que AccountModule exporte AccountService 
//étant donné qu'il n'y a pas de persistance direct du transfer mais
//(pour l'instant) simplement un impact sur 2 comptes (à débiter et créditer)
//la partie transfert est dans ce même module "account"