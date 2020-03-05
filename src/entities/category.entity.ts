import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  Tree,
  TreeChildren,
  TreeParent,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Article } from './article.entity';
import { User } from './user.entity';
import { IsDate } from 'class-validator';

@Entity()
export class Category {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 45 })
  title: string;

  @Column({ length: 45 })
  content: string;

  @Column()
  clientId: string;

  @Column()
  userId: string;  

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;

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

  @OneToMany(type => Article, article => article.categoryId, { onDelete: 'CASCADE' })
  articles: Article[];

  @ManyToOne(type => User, user => user.id, { onDelete: 'CASCADE' })
  user: User;

}
