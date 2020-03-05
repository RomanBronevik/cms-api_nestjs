import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsInt, IsDate } from "class-validator";
import { Client } from './client.entity';
import { Category } from './category.entity';
import { Tag } from './tag.entity';
import { User } from './user.entity';

@Entity()
export class Article {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 45 })
  title: string;

  @Column({ type: "longtext" })
  previewContent: string;

  @Column({ type: "longtext" })
  content: string;

  @Column({ length: 500, nullable: true })
  description: string;

  @Column({ default: 0 })
  @IsInt()
  view: number;

  @Column()
  image: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ length: 500, nullable: true })
  shortDescription: string;

  @Column()
  clientId: string;

  @Column({ nullable: true })
  categoryId: string;

  @Column()
  userId: string;

  @Column({ length: 10, nullable: true })
  secretKey: string;

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @IsDate()
  updatedAt: Date;

  @Column({ nullable: true })
  createdBy: string;

  @Column({ length: 10, unique: true })
  humanId: string;

  @Column({ nullable: true })
  url: string;

  @ManyToOne(type => Client, client => client.id, { onDelete: 'CASCADE' })
  client: Client;

  @ManyToOne(type => Category, category => category.id, { onDelete: 'CASCADE' })
  category: Category;

  @ManyToMany(type => Tag, tag => tag.articles)
  @JoinTable({
    name: 'article_tag',
    joinColumn: { name: 'articleId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags: Tag[];

  @ManyToOne(type => User, user => user.id)
  user: User;

}
