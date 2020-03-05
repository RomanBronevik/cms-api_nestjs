import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, getConnection } from 'typeorm';
import { Article } from '../../entities/article.entity';
import { ArticleTag } from '../../entities/article-tag.entity';
import { RequestContext } from '../../contexts/request.context';
import { Tag } from '../../entities/tag.entity';
import { UserRole } from '../../entities/role.entity';
import { connection } from '../../constants';
const excel = require('excel4node');
const XLSX = require('xlsx');

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(Article) private articleRepository: Repository<Article>,
        @InjectRepository(ArticleTag) private articleTagRepository: Repository<ArticleTag>,
        @InjectRepository(Tag) private tagRepository: Repository<Tag>,
    ) { }

    async getArticles(page: number, size: number, keyword: string, categoryId: string, sort: string = 'createdAt', order: any = 'DESC', idOfClient: string) {
        const { role, clientId }: any = RequestContext.getCurrentUser();
        let query = getRepository(Article)
            .createQueryBuilder("article")
            .leftJoinAndSelect("article.user", "user")
            .orderBy(`article.${sort}`, order)
            .select(["article", "user.displayName"])
        if (keyword) {
            query = query.andWhere(`(article.title like '%${keyword}%' OR article.content like '%${keyword}%' OR article.description like '%${keyword}%')`);
        }
        if (keyword && sort && order)
            query = query.andWhere(`(article.title like '%${keyword}%' OR article.content like '%${keyword}%' OR article.description like '%${keyword}%')`).orderBy(`article.${sort}`, order);
        if (sort && order)
            query = query.orderBy(`article.${sort}`, order);
        if (categoryId) {
            query = query.andWhere(`article.categoryId = '${categoryId}'`);
        }
        if (role === UserRole.ADMIN) {
            query = query.andWhere(`article.clientId = '${clientId}'`);
        } else if (idOfClient && role === UserRole.SUPER_ADMIN) {
            query = query.andWhere(`article.clientId = '${idOfClient}'`);
        }
        const totalItem = await query.getCount();
        const totalPage = Math.ceil(totalItem / size);
        const articles = await query.limit(size).offset(size * page).getMany();
        return {
            pagination: {
                totalPage,
                totalItem
            },
            items: articles
        };
    }

    async importArticle(file) {
        const workbook = XLSX.readFile(`${file.path}`);
        const rows = XLSX.utils.sheet_to_json(workbook.Sheets['Sheet 1']);
        const articles = await this.articleRepository.find();
        let idsAr = articles.map(item => String(item.id && item.humanId));
        let data = [];
        rows.forEach(item => {
            item.createdAt = new Date(item.createdAt);
            item.updatedAt = new Date(item.updatedAt);
            if (idsAr.indexOf(String(item.id && item.humanId)) === -1) {
                const items = Object.values(item);
                data.push(items);
            }
        })
        if (data.length > 0) {
            connection.connect((error) => {
                if (error) {
                    console.error(error);
                } else {
                    let query = 'INSERT INTO article (id, title, content, description, view, image, isActive, shortDescription, clientId, categoryId, userId, createdAt, updatedAt, createdBy, humanId, url) VALUES ?';
                    connection.query(query, [data], (error, response) => {
                        console.log(error || response);
                    });
                }
            });
            return { success: true };
        }
    }

    async exportArticle(res) {
        const { clientId, role }: any = RequestContext.getCurrentUser();
        let articles: Article[];
        if (role === UserRole.SUPER_ADMIN) {
            articles = await this.articleRepository.find();
        } else {
            articles = await this.articleRepository.find({ clientId });
        }
        const wb = new excel.Workbook();
        const ws = wb.addWorksheet('Sheet 1');
        const border = {
            left: {
                style: 'thin',
                color: 'black',
            },
            right: {
                style: 'thin',
                color: 'black',
            },
            top: {
                style: 'thin',
                color: 'black',
            },
            bottom: {
                style: 'thin',
                color: 'black',
            },
        };
        const size = 14;
        const style = wb.createStyle({
            font: {
                color: 'black',
                size,
            },
            border,
        });
        const titleStyle = wb.createStyle({
            font: {
                color: '#fd003f',
                size,
                bold: true,
            },
            border,
        });
        ws.column(4).setWidth(15);
        ws.column(8).setWidth(20);
        ws.column(14).setWidth(45);
        ws.column(10).setWidth(15);
        ws.column(12).setWidth(15);
        ws.column(13).setWidth(15);
        ws.cell(1, 1)
            .string('id')
            .style(titleStyle);
        ws.cell(1, 2)
            .string('title')
            .style(titleStyle);
        ws.cell(1, 3)
            .string('content')
            .style(titleStyle);
        ws.cell(1, 4)
            .string('description')
            .style(titleStyle);
        ws.cell(1, 5)
            .string('view')
            .style(titleStyle);
        ws.cell(1, 6)
            .string('image')
            .style(titleStyle);
        ws.cell(1, 7)
            .string('isActive')
            .style(titleStyle);
        ws.cell(1, 8)
            .string('shortDescription')
            .style(titleStyle);
        ws.cell(1, 9)
            .string('clientId')
            .style(titleStyle);
        ws.cell(1, 10)
            .string('categoryId')
            .style(titleStyle);
        ws.cell(1, 11)
            .string('userId')
            .style(titleStyle);
        ws.cell(1, 12)
            .string('createdAt')
            .style(titleStyle);
        ws.cell(1, 13)
            .string('updatedAt')
            .style(titleStyle);
        ws.cell(1, 14)
            .string('createdBy')
            .style(titleStyle);
        ws.cell(1, 15)
            .string('humanId')
            .style(titleStyle);
        ws.cell(1, 16)
            .string('url')
            .style(titleStyle);
        ws.cell(1, 17)
            .string('secretKey')
            .style(titleStyle);
        articles.forEach((article, index) => {
            ws.cell(2 + index, 1)
                .string(article.id)
                .style(style);
            ws.cell(2 + index, 2)
                .string(article.title)
                .style(style);
            ws.cell(2 + index, 3)
                .string(article.content)
                .style(style);
            ws.cell(2 + index, 4)
                .string(article.description)
                .style(style);
            ws.cell(2 + index, 5)
                .number(article.view)
                .style(style);
            ws.cell(2 + index, 6)
                .string(article.image)
                .style(style);
            ws.cell(2 + index, 7)
                .bool(article.isActive)
                .style(style);
            ws.cell(2 + index, 8)
                .string(article.shortDescription)
                .style(style);
            ws.cell(2 + index, 9)
                .string(article.clientId)
                .style(style);
            ws.cell(2 + index, 10)
                .string(article.categoryId)
                .style(style);
            ws.cell(2 + index, 11)
                .string(article.userId)
                .style(style);
            ws.cell(2 + index, 12)
                .number(new Date(article.createdAt).getTime())
                .style(style);
            ws.cell(2 + index, 13)
                .number(new Date(article.updatedAt).getTime())
                .style(style);
            ws.cell(2 + index, 14)
                .string(article.createdBy)
                .style(style);
            ws.cell(2 + index, 15)
                .string(article.humanId)
                .style(style);
            ws.cell(2 + index, 16)
                .string(article.url)
                .style(style);
            ws.cell(2 + index, 17)
                .string(article.secretKey)
                .style(style);
        });
        wb.write('./public/article.xlsx');
        setTimeout(() => {
            res.send('https://api-cms.dotnets.org/article.xlsx');
            // res.send('http://localhost:3001/article.xlsx');
        }, 250);
    }

    async getArticle(id: string) {
        const { role, clientId }: any = RequestContext.getCurrentUser();
        const articleTags = await this.articleTagRepository.find({ articleId: id });
        const promises = articleTags.map(({ tagId }) =>
            this.tagRepository.findOne({ id: tagId }),
        );
        const tags = await Promise.all(promises);
        let article: any;
        if (role === UserRole.SUPER_ADMIN) {
            article = await this.articleRepository.findOne({ id });
        } else {
            article = await this.articleRepository.findOne({ id, clientId });
        }
        if (tags.length !== 0) article.tags = tags;
        return article;
    }

    async createArticle(article: Article) {
        await this.articleRepository.save(article);
        return { id: article.id };
    }

    async updateArticle(article: Article) {
        await this.articleRepository.save(article);
        return { id: article.id };
    }

    async deleteArticle(article: Article) {
        this.articleRepository.remove(article);
        return { id: article.id };
    }

    async test() {
        return await this.articleRepository.find();
    }
}
