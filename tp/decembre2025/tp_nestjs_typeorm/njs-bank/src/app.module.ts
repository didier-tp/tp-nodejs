import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './account/entities/account.entity';
import { OperationEntity } from './account/entities/operation.entity';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { CustomerModule } from './customer/customer.module';
import { AccountModule } from './account/account.module';
import { CustomerEntity } from './customer/entities/customer.entity';


// option synchronize:true de typeorm pour créer les tables automatiquement (dev only , not prod !!!)

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public') ,
      exclude: ['/bank-api/(.*)'], 
    }),
    AutomapperModule.forRoot(
          {
              strategyInitializer: classes(),
          } 
    ),
    /*
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nestJsBankDb',
      entities: [CustomerEntity,AccountEntity ,OperationEntity]
    }),
    */
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'nestJsBankDb',
      entities: [CustomerEntity,AccountEntity ,OperationEntity]
    }),
    CustomerModule , AccountModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

/*
Dépendances entre modules:
=========================
AccountModule (with account , operation, transfer/virement)
  dépend de CustomerModule (many-to-many)

*/
