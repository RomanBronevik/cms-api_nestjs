import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../../entities/permission.entity';

@Injectable()
export class PermissionService {

  constructor(
    @InjectRepository(Permission) private permissionRepository: Repository<Permission>) {
  }

  async getPermissions(): Promise<Permission[]> {
    return await this.permissionRepository.find();
  }

  async getPermission(id: string): Promise<Permission[]> {
    return await this.permissionRepository.find({ id });
  }

  async createPermission(permission: Permission) {
    await this.permissionRepository.save(permission);
    return { id: permission.id };
  }

  async updatePermission(permission: Permission) {
    await this.permissionRepository.update(permission.id, permission);
    return { id: permission.id };
  }

  async deletePermission(id: string) {
    await this.permissionRepository.delete(id);
    return { id };
  }

}