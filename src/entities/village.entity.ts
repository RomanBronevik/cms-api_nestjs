import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Village {

  @PrimaryColumn()
  id: string;

  @Column({ length: 191 })
  name: string;

  @Column({ length: 20, nullable: true })
  wardId: string;

}
