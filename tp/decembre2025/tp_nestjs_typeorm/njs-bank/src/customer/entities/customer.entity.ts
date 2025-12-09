
import { AutoMap } from '@automapper/classes';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'; 


@Entity("customer")
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id?: number;

  @Column()
  @AutoMap()
  firstname: string;

  @Column()
  @AutoMap()
  lastname: string;

  @Column()
  @AutoMap()
  //@Exclude() //ancien test temporaire
  email?: string;

}
