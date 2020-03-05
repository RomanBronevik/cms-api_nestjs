import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role, UserRole } from './entities/role.entity';
import { DbExample } from './seeds/db.example';
import { UserService } from './modules/user/user.service';
import { Article } from './entities/article.entity';
import { Client } from './entities/client.entity';
import { Category } from './entities/category.entity';
import { RequestContext } from './contexts/request.context';
import { Permission } from './entities/permission.entity';
import { Counter } from './entities/counter.entity';
import { connection } from './constants';


@Injectable()
export class AppService implements OnModuleInit {

    constructor(
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        @InjectRepository(Counter) private counterRepository: Repository<Counter>,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Article) private articleRepository: Repository<Article>,
        @InjectRepository(Client) private clientRepository: Repository<Client>,
        @InjectRepository(Category) private categoryRepository: Repository<Category>,
        @InjectRepository(Permission) private permissionRepository: Repository<Permission>, ) {
    }

    async getStats() {
        const userCurrent: any = RequestContext.getCurrentUser();
        const articleCount = await this.articleRepository.count({ clientId: userCurrent.clientId });
        const categoryCount = await this.categoryRepository.count({ clientId: userCurrent.clientId });
        const { viewCount } = await getRepository(Article)
            .createQueryBuilder("article")
            .select("SUM(view)", "viewCount")
            .where("clientId = :clientId", { clientId: userCurrent.clientId })
            .getRawOne();
        return { articleCount, categoryCount, viewCount };
    }

    async insertUser(role) {
        const promises = [];
        const users = await this.userRepository.find();
        const categories = await this.categoryRepository.find();
        const { id: clientId } = await this.clientRepository.findOne();
        if (users.length === 0) {
            DbExample.users.forEach(user => {
                user.password = UserService.getHash(user.password);
                user.roleId = role.id;
                user.clientId = clientId;
                const promise = this.userRepository.save(user);
                promises.push(promise);
                Promise.all(promises).then(addUser => {
                    const user = addUser[0];
                    this.insertCategory(categories, user);
                });
            })
        } else {
            this.insertCategory(categories, users[0]);
        }
    }
    async insertCategory(categories, user) {
        const articles = await this.articleRepository.find();
        let data = [];
        if (categories.length === 0) {
            DbExample.categories.forEach(e => {
                e.userId = user.id;
                e.clientId = user.clientId;
                data.push(Object.values(e));
            });
            connection.connect((error) => {
                if (error) {
                    console.error(error);
                } else {
                    let query = 'INSERT INTO category (id, title, content, clientId, userId, humanId) VALUES ?';
                    connection.query(query, [data], (error, response) => {
                        console.log(error || response);
                    });
                }
            });
            setTimeout(() => {
                const category = this.categoryRepository.findOne();
                category.then(item => {
                    this.insertArticle(articles, user, item);
                });
            }, 200);
        } else {
            const category = await this.categoryRepository.findOne();
            this.insertArticle(articles, user, category);
        }
    }
    async insertArticle(articles, user, category) {
        let data = [];
        if (articles.length === 0) {
            DbExample.articles.forEach(article => {
                article.clientId = user.clientId;
                article.categoryId = category.id;
                article.userId = user.id;
                data.push(Object.values(article));
            });
            connection.connect((error) => {
                let query = 'INSERT INTO article (id, title, content, description, image, clientId, categoryId, userId, humanId, url) VALUES ?';
                connection.query(query, [data], (error, response) => {
                    console.log(error || response);
                });
            });
        }
    }

    async insertRole(roles, permission, client) {
        const promises = [];
        let pers: string[];
        if (roles.length === 0) {
            DbExample.roles.forEach(e => {
                e.clientId = client[0].id;
                switch (e.role) {
                    case UserRole.SUPER_ADMIN:
                        pers = ["getUsers", "getUser", "createUser", "updateUser", "deleteUser", "getArticles", "getArticle", "createArticle", "updateArticle", "deleteArticle", "getCategories", "getCategory", "createCategory", "updateCategory", "deleteCategory", "getClients", "getClient", "createClient", "updateClient", "deleteClient", "getPermissions", "getPermission", "createPermission", "updatePermission", "deletePermission", "getRoles", "getRole", "createRole", "updateRole", "deleteRole", "getTags", "getTag", "createTag", "updateTag", "deleteTag", "importFile", "exportFile"];
                        const permissionSuperAdmin = permission.filter(e => pers.includes(e.name))
                        e.permissions = permissionSuperAdmin;
                        break;
                    case UserRole.ADMIN:
                        pers = ["getUsers", "getUser", "createUser", "updateUser", "deleteUser", "getArticles", "getArticle", "createArticle", "updateArticle", "deleteArticle", "getCategories", "getCategory", "createCategory", "updateCategory", "deleteCategory", "getClients", "getClient", "updateClient", "getPermissions", "getPermission", "createPermission", "updatePermission", "deletePermission", "getRoles", "getRole", "getTags", "getTag", "createTag", "updateTag", "deleteTag", "importFile", "exportFile"];
                        const permissionAdmin = permission.filter(e => pers.includes(e.name))
                        e.permissions = permissionAdmin;
                        break;
                    case UserRole.USER:
                        pers = ["getUsers", "getUser", "getArticles", "getArticle", "getCategories", "getCategory", "getClients", "getClient", "getRoles", "getRole", "getTags", "getTag"];
                        const permissionEditor = permission.filter(e => pers.includes(e.name))
                        e.permissions = permissionEditor;
                        break;
                }
                const promise = this.roleRepository.save(e);
                promises.push(promise);
            });
            Promise.all(promises).then(addedRoles => {
                const roleSuperAdmin = addedRoles.filter(r => r.role === 'SuperAdmin')[0];
                this.insertUser(roleSuperAdmin);
            });
        }
        else {
            const roleSuperAdmin = roles.filter(r => r.role === 'SuperAdmin')[0];
            this.insertUser(roleSuperAdmin);
        }
    }

    async insertCounter(items) {
        if (items.length === 0) {
            DbExample.counters.forEach(counter => {
                return this.counterRepository.save(counter);
            });
        }
    }
    async onModuleInit(): Promise<any> {
        const roles = await this.roleRepository.find();
        const clients = await this.clientRepository.find();
        const permissions = await this.permissionRepository.find();
        const counters = await this.counterRepository.find();
        this.insertCounter(counters);
        let promisePermissions = [];
        let permission;
        if (permissions.length === 0) {
            DbExample.permissions.forEach(permission => {
                const promise = this.permissionRepository.save(permission);
                promisePermissions.push(promise);
            });
            Promise.all(promisePermissions).then(result => {
                permission = result;
            })
        }
        if (clients.length === 0) {
            const promises = [];
            DbExample.clients.forEach(client => {
                const promise = this.clientRepository.save(client);
                promises.push(promise);
            });
            Promise.all(promises).then(client => {
                this.insertRole(roles, permission, client);
            });
        } else {
            Promise.all(promisePermissions).then(permission => {
                this.insertRole(roles, permission, clients);
            });
        }

    }
}
