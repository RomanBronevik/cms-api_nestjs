import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Role } from './role.entity';
import { Client } from './client.entity';
import { Article } from './article.entity';
import { Tag } from './tag.entity';
import { Category } from './category.entity';
import { IsDate, IsEmail } from 'class-validator';

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 100 })
  password: string;

  @Column()
  clientId: string;

  @Column()
  roleId: string;

  @Column({ nullable: true })
  provinceId: string;

  @Column({ nullable: true })
  districtId: string;

  @Column({ nullable: true })
  wardId: string;

  @Column({ nullable: true })
  villageId: string;

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @IsDate()
  updatedAt: Date;

  @Column({ nullable: true })
  createdBy: string;

  @Column()
  displayName: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ length: 10, unique: true })
  humanId: string;

  @Column({ length: 150, nullable: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  address: string;

  @ManyToOne(type => Client, client => client.id, { onDelete: 'CASCADE' })
  client: Client;

  @ManyToOne(type => Role, role => role.id)
  role: Role;

  @OneToMany(type => Article, article => article.userId)
  article: Article[];

  @OneToMany(type => Tag, tag => tag.userId, { onDelete: 'CASCADE' })
  tag: Tag[];

  @OneToMany(type => Category, category => category.userId, { onDelete: 'CASCADE' })
  category: Category[];

}
