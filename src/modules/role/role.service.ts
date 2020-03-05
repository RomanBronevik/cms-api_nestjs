import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Role, UserRole } from '../../entities/role.entity';
import { RequestContext } from '../../contexts/request.context';
import { Permission } from '../../entities/permission.entity';

@Injectable()
export class RoleService {

  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Permission) private permissionRepository: Repository<Permission>) {
  }

  async getRoles() {
    const { role, clientId }: any = RequestContext.getCurrentUser();
    // if (role === UserRole.SUPER_ADMIN) {
    //   return await this.roleRepository.find();
    // } else {
    // }
    return await this.roleRepository.find({ clientId });
  }

  async getRole(id: string) {
    const { role, clientId }: any = RequestContext.getCurrentUser();
    if (role === UserRole.SUPER_ADMIN) {
      return await this.roleRepository.findOne({ where: { id }, relations: ['permissions'] });
    } else {
      return await this.roleRepository.findOne({ where: { id, clientId }, relations: ['permissions'] });
    }
  }

  async createRole(role: Role) {
    let roleLower = role.role.toLowerCase();
    const permissions = await this.permissionRepository.find();
    let addedpermission: Permission[];
    let pers: string[];
    switch (roleLower) {
      case 'superadmin':
        pers = ["getUsers", "getUser", "createUser", "updateUser", "deleteUser", "getArticles", "getArticle", "createArticle", "updateArticle", "deleteArticle", "getCategories", "getCategory", "createCategory", "updateCategory", "deleteCategory", "getClients", "getClient", "createClient", "updateClient", "deleteClient", "getPermissions", "getPermission", "createPermission", "updatePermission", "deletePermission", "getRoles", "getRole", "createRole", "updateRole", "deleteRole", "getTags", "getTag", "createTag", "updateTag", "deleteTag", "importFile", "exportFile"];
        break;
      case 'admin':
        pers = ["getUsers", "getUser", "createUser", "updateUser", "deleteUser", "getArticles", "getArticle", "createArticle", "updateArticle", "deleteArticle", "getCategories", "getCategory", "createCategory", "updateCategory", "deleteCategory", "getClients", "getClient", "updateClient", "getRoles", "getRole", "getTags", "getTag", "createTag", "updateTag", "deleteTag", "importFile", "exportFile"];
        break;
      case 'user':
        pers = ["getUsers", "getUser", "getArticles", "getArticle", "getCategories", "getCategory", "getClients", "getClient", "getRoles", "getRole", "getTags", "getTag"];
        break;
    }
    addedpermission = permissions.filter(e => pers.includes(e.name));
    role.permissions = addedpermission;
    await this.roleRepository.save(role);
    return { id: role.id };
  }

  async updateRole(role: Role) {
    await this.roleRepository.save(role);
    return { id: role.id };
  }

  async deleteRole(id: string) {
    await this.roleRepository.delete(id);
    return { id };
  }
}