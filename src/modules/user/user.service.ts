import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, getRepository, getConnection } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Role, UserRole } from '../../entities/role.entity';
import { RequestContext } from '../../contexts/request.context';
import { Client } from '../../entities/client.entity';
import { forbiddenException } from '../../constants';

@Injectable()
export class UserService {
    // private saltRounds = 10;
    static saltRounds = 10;

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        @InjectRepository(Client) private clientRepository: Repository<Client>,
    ) { }

    async getCurrentUser(currentUser: any) {
        const user = await this.userRepository.findOne({ id: currentUser.id });
        const [role, client] = await Promise.all([
            this.roleRepository.findOne({ id: user.roleId }),
            this.clientRepository.findOne({ id: user.clientId }),
        ]);
        const currentUserInfo: any = {
            ...user,
            role,
            client,
        };
        return currentUserInfo;
    }

    async getUserByUsername(username: string): Promise<User> {
        return await this.userRepository.findOne({ username });
    }

    async createUser(user: User): Promise<User> {
        const { role, clientId }: any = RequestContext.getCurrentUser();
        user.password = UserService.getHash(user.password);
        user.clientId = clientId;
        return await this.userRepository.save(user);
    }

    public static getHash(password: string): string {
        return bcrypt.hashSync(password.toString(), this.saltRounds);
    }

    async compareHash(password: string | undefined, hash: string | undefined): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

    async getUsers(keyword: string, sort: string = 'createdAt', order: any = 'DESC', idOfClient: string): Promise<User[]> {
        const { role, clientId }: any = RequestContext.getCurrentUser();
        let query = getRepository(User)
            .createQueryBuilder("user")
            .leftJoinAndSelect('user.role', 'role')
            .leftJoinAndSelect('user.client', 'client')
            .leftJoinAndSelect('role.permissions', 'permissions')
            .select(["user", "role.id", "role.role", "permissions", "client.name"])
            .orderBy(`user.${sort}`, order);
        if (keyword)
            query.andWhere(`user.displayName like '%${keyword}%'`);
        if (role === UserRole.SUPER_ADMIN) {
            if (idOfClient)
                query.andWhere(`user.clientId = '${idOfClient}'`);
        } else {
            query.andWhere(`user.clientId = '${clientId}'`);
        }
        const users = await query.getMany();
        return users;
    }

    async getUser(id: string): Promise<User> {
        const { role, clientId }: any = RequestContext.getCurrentUser();
        let user: User;
        if (role === UserRole.SUPER_ADMIN) {
            user = await this.userRepository.findOne({ id });
        } else {
            user = await this.userRepository.findOne({ id, clientId });
        }
        return user;
    }

    async updateUser(user: User) {
        const { role, clientId }: any = RequestContext.getCurrentUser();
        if (role === UserRole.SUPER_ADMIN) {
            await this.userRepository.update(user.id, user);
        } else {
            user.clientId = clientId;
            await this.userRepository.update({ id: user.id, clientId }, user);
        }
        return { id: user.id };
    }

    async deleteUser(id: string) {
        const { role, clientId }: any = RequestContext.getCurrentUser();
        if (role === UserRole.SUPER_ADMIN) {
            await this.userRepository.delete(id);
            return { id };
        } else {
            const { role: roleOfDeletedUser }: any = await this.userRepository.findOne({
                where: { id },
                relations: ['role']
            })
            const user = await this.userRepository.findOne({ id, clientId });
            if (roleOfDeletedUser.role !== UserRole.ADMIN) {
                await this.userRepository.delete(user.id);
                return { id: user.id };
            }
            forbiddenException();
        }
    }

}