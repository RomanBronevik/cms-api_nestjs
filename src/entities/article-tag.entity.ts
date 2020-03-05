import { Entity, Column } from 'typeorm';

@Entity({ synchronize: false })
export class ArticleTag {

  @Column({ primary: true, nullable: false })
  articleId: string;

  @Column({ primary: true, nullable: false })
  tagId: string;

}