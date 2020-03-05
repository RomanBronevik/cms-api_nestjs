import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { Village } from './village.entity';

@Entity()
export class Ward {

  @PrimaryColumn()
  id: string;

  @Column({ length: 191 })
  name: string;

  @Column({ length: 20, nullable: true })
  districtId: string;

  // @OneToMany(type => Village, village => village.wardId, { onDelete: 'CASCADE' })
  // villages: Village[];
  
}
