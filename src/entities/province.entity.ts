import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { District } from './district.entity';

@Entity()
export class Province {

  @PrimaryColumn()
  id: string;

  @Column({ length: 191, nullable: true })
  name: string;

  // @OneToMany(type => District, district => district.provinceId, { onDelete: 'CASCADE' })
  // districts: District[];

}
