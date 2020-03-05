import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, getConnection } from 'typeorm';
import { Category } from '../../entities/category.entity';
import { RequestContext } from '../../contexts/request.context';
import { Article } from '../../entities/article.entity';
import { UserRole } from '../../entities/role.entity';

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
        @InjectRepository(Article) private articleRepository: Repository<Article>,
    ) {
    }

    async getCategories(page: number, size: number, keyword: string, sort: string = 'createdAt', order: any = 'DESC') {
        const { role, clientId }: any = RequestContext.getCurrentUser();
        let query = getRepository(Category)
            .createQueryBuilder("category")
            .leftJoinAndSelect("category.user", "user")
            .select(["category", "user.displayName"])
            .orderBy(`category.${sort}`, order);
        if (keyword) {
            query = query.andWhere(`(category.title like '%${keyword}%')`);
        }

        if (role === UserRole.ADMIN) {
            query = query.andWhere(`category.clientId = '${clientId}'`);
        }
        const totalItem = await query.getCount();
        const totalPage = Math.ceil(totalItem / size);
        const categories = await query.limit(size).offset(size * page).getMany();
        return {
            pagination: {
                totalPage,
                totalItem,
            },
            items: categories,
        };
    }

    async getCategory(id: string) {
        const { role, clientId }: any = RequestContext.getCurrentUser();
        if (role === UserRole.SUPER_ADMIN) {
            return await this.categoryRepository.findOne({
                select: ['id', 'title', 'content'],
                where: { id }
            });
        } else {
            return await this.categoryRepository.findOne({
                select: ['id', 'title', 'content'],
                where: { id, clientId }
            });
        }

    }

    async createCategory(category: Category) {
        if (!category.title) {
            return { error: 'Title can"t empty' }
        }
        await this.categoryRepository.save(category);
        return { id: category.id };
    }

    async updateCategory(category: Category) {
        await this.categoryRepository.save(category);
        return { id: category.id };
    }

    async deleteCategory(category) {
        const article = await this.articleRepository.findOne({ categoryId: category.id })
        const connection = getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const categoryInstance = new Category();
            let articleInstance: any = new Article();
            categoryInstance.id = category.id;
            await queryRunner.manager.remove(categoryInstance);
            articleInstance.id = article.id;
            articleInstance.title = article.title;
            articleInstance.content = article.content;
            articleInstance.description = article.description;
            articleInstance.image = article.image;
            articleInstance.categoryId = null;
            await queryRunner.manager.save(articleInstance);
            await queryRunner.commitTransaction();
            return { id: category.id };
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

}