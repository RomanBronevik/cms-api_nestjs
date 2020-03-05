import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestContext } from '../../contexts/request.context';
import { getRepository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Role } from '../../entities/role.entity';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector, ) { }

  async canActivate(context: ExecutionContext) {
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
    if (!permissions) {
      return true;
    }
    const { roleId }: any = RequestContext.getCurrentUser();
    const role: any = await getRepository(Role)
      .createQueryBuilder("role")
      .leftJoinAndSelect("role.permissions", "permissions")
      .where("role.id = :id", { id: roleId })
      .getOne();
    const isMatch = role.permissions.some(e => e.name === permissions[0])
    return isMatch;
  }
}