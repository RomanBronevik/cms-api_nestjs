import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Article } from '../../entities/article.entity';
import { Client } from '../../entities/client.entity';
import { Category } from '../../entities/category.entity';
import { forbiddenException } from '../../constants';
import { User } from '../../entities/user.entity';
import { Role } from '../../entities/role.entity';

@Injectable()
export class PublicService {
  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>, ) { }

  async getArticlePublic(query, value) {
    const articles = await getRepository(Article)
      .createQueryBuilder("article")
      .leftJoinAndSelect("article.category", "category")
      .leftJoinAndSelect("article.user", "user")
      .select(["article.id", "article.description", "article.title", "article.image", "article.createdAt", "article.image",
        "category.title", "user.displayName"])
      .where(query, value)
      .orderBy('article.createdAt', "DESC")
      .getMany();
    return articles;
  }

  async getArticlesList(domain: string, categoryId: string) {
    const { id: clientId } = await this.clientRepository.findOne({ where: [{ siteUrl: Like(`%${domain}%`) }, { subSiteUrl: Like(`%${domain}%`) }] });
    if (!clientId) {
      forbiddenException();
    }
    if (categoryId) {
      const query = "article.categoryId = :categoryId && article.clientId = :clientId && article.isActive = :isActive";
      return this.getArticlePublic(query, { categoryId, clientId, isActive: 1 });
    } else {
      const query = "article.clientId = :clientId && article.isActive = :isActive";
      return this.getArticlePublic(query, { clientId, isActive: 1 });
    }
  }

  async getArticlesBySecretKey(page: number, size: number, secretKey: string) {
    let query = getRepository(Article)
      .createQueryBuilder("article")
      .leftJoinAndSelect("article.user", "user")
      .select(["article", "user.displayName"])
      .where("article.secretKey = :secretKey && article.isActive = :isActive", { secretKey, isActive: 1 })
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

  async getComments(categoryId: string) {
    const articles = await getRepository(Article)
      .createQueryBuilder("article")
      .where("article.categoryId = :categoryId", { categoryId })
      .getMany();
    return articles;
  }

  async getServices(categoryId: string) {
    const articles = await getRepository(Article)
      .createQueryBuilder("article")
      .where("article.categoryId = :categoryId", { categoryId })
      .orderBy('article.createdAt', "ASC")
      .getMany();
    return articles;
  }

  async getCategoriesList(domain: string) {
    const { id: clientId } = await this.clientRepository.findOne({ where: [{ siteUrl: Like(`%${domain}%`) }, { subSiteUrl: Like(`%${domain}%`) }] });
    if (!clientId) {
      forbiddenException();
    }
    const categories = await this.categoryRepository.find({
      where: { clientId }
    });
    return categories;
  }

  async getAllCategories() {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async getArticleById(id: string) {
    //await this.articleRepository.update(id, { view: () => "view + 1" });
    //const articleTags = await this.articleTagRepository.find({ articleId: id });
    const article = await getRepository(Article)
      .createQueryBuilder("article")
      .leftJoinAndSelect("article.category", "category")
      .leftJoinAndSelect("article.user", "user")
      .select(["article", "category.title", "user.displayName"])
      .where("article.id = :id", { id })
      .getOne();
    // const promises = articleTags.map(({ tagId }) => this.tagRepository.findOne({ id: tagId }));
    // const tags = await Promise.all(promises);
    // article.tags = tags;
    return article;
  }

  async getArticleByCategoryId(categoryId: string) {
    //await this.articleRepository.update(id, { view: () => "view + 1" });
    //const articleTags = await this.articleTagRepository.find({ articleId: id });
    const article = await getRepository(Article)
      .createQueryBuilder("article")
      .leftJoinAndSelect("article.category", "category")
      .leftJoinAndSelect("article.user", "user")
      .select(["article", "category.title", "user.displayName"])
      .where("article.categoryId = :categoryId", { categoryId })
      .getMany();
    // const promises = articleTags.map(({ tagId }) => this.tagRepository.findOne({ id: tagId }));
    // const tags = await Promise.all(promises);
    // article.tags = tags;
    return article;
  }

  async generateApiKey() {
    let r = Math.random().toString(36).substr(2, 10) + Math.random().toString(36).substr(2, 10) + Math.random().toString(36).substr(2, 10);
    return r.toUpperCase();
  }

  getHash(password: string): string {
    return bcrypt.hashSync(password.toString(), 10);
  }

  async register(info: any) {
    const user = await this.userRepository.findOne({ username: info.username });
    if (user) {
      return { failed: 'Username already exists' }
    }
    const client = {
      name: info.name,
      siteUrl: info.siteUrl,
      phone: info.phone,
      email: info.email,
    }
    const clientData = this.clientRepository.save(client);
    clientData.then(client => {
      const role: any = {
        role: 'Admin',
        text: `Admin of ${client.name}`,
        clientId: client.id
      }
      const roleData = this.roleRepository.save(role);
      roleData.then(role => {
        const user = {
          username: info.username,
          password: this.getHash(info.password),
          clientId: client.id,
          roleId: role.id,
          displayName: info.displayName
        }
        const userData = this.userRepository.save(user);
        userData.then(user => {
          return { success: true };
        })
      })
    })
  }

}