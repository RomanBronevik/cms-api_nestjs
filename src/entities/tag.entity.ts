
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Article } from './article.entity';
import { IsDate } from 'class-validator';

@Entity()
export class Tag {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 500, nullable: true })
  description: string;

  @Column()
  userId: string;

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @IsDate()
  updatedAt: Date;

  @Column()
  createdBy: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(type => User, user => user.id, { onDelete: 'CASCADE' })
  user: User;

  @ManyToMany(type => Article, article => article.tags)
  articles: Article[];

}
