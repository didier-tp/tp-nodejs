import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'; 
import { AutoMap } from '@automapper/classes';
import { AccountEntity } from './account.entity';

@Entity("operation")
export class OperationEntity  {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id?: number;

  @Column()
  @AutoMap()
  label: string;

  @Column()
  @AutoMap()
  amount: number;

  @Column({name:'opdatetime'})
  @AutoMap()
  opDateTime: Date;

  @ManyToOne(()=> AccountEntity , account => account.num)
  @JoinColumn({name:'account_num'})
  @AutoMap()
  account : AccountEntity;

}