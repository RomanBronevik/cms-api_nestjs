import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsFQDN, IsEmail, IsDate } from "class-validator";
import { Article } from './article.entity';
import { User } from './user.entity';

@Entity()
export class Client {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 45 })
  name: string;

  @Column({ length: 500 })
  @IsFQDN()
  siteUrl: string;

  @Column({ nullable: true, length: 500 })
  @IsFQDN()
  subSiteUrl: string;

  @Column({ length: 50 })
  phone: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ length: 150 })
  @IsEmail()
  email: string;

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @IsDate()
  updatedAt: Date;

  @Column({ nullable: true })
  createdBy: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ length: 10, unique: true })
  humanId: string;

  @OneToMany(type => Article, article => article.clientId, { onDelete: 'CASCADE' })
  articles: Article[];

  @OneToMany(type => User, user => user.clientId, { onDelete: 'CASCADE' })
  users: User[];

}
