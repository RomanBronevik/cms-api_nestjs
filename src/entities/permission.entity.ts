import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class Permission {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ nullable: true, length: 50 })
  text: string;
  
  @ManyToMany(type => Role, role => role.permissions)
  roles: Role[];

}
