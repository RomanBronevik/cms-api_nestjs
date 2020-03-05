import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { Ward } from './ward.entity';

@Entity()
export class District {

  @PrimaryColumn()
  id: string;

  @Column({ length: 191 })
  name: string;

  @Column({ length: 20, nullable: true })
  provinceId: string;

  // @OneToMany(type => Ward, ward => ward.districtId, { onDelete: 'CASCADE' })
  // wards: Ward[];
  
}
