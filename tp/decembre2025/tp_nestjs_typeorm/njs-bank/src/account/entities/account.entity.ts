import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm'; 
import { CustomerEntity } from 'src/customer/entities/customer.entity';
import { AutoMap } from '@automapper/classes';


@Entity("account")
export class AccountEntity  {
  @PrimaryGeneratedColumn()
  @AutoMap()
  num?: number;

  @Column()
  @AutoMap()
  label: string;

  @Column()
  @AutoMap()
  balance: number;

  /*
  // OLD n-1 version:
  @ManyToOne(()=> CustomerEntity , owner => owner.id)
  @JoinColumn({name:'customer_id'})
  owner : CustomerEntity;
  */

   // NEW n-n version (joinColumn : this_side , inverseJoinColumn : collection side )
   @ManyToMany(()=> CustomerEntity )
   @JoinTable({ name: 'customer_account' ,
    joinColumn: { name: 'account_num' },
    inverseJoinColumn: {  name: 'customer_id' }
   })
   //@AutoMap()
   owners? : CustomerEntity[];

}