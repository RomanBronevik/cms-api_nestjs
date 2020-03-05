import { Entity, Column } from 'typeorm';

@Entity({ synchronize: false })
export class RolePermission {

  @Column({ primary: true, nullable: false })
  roleId: string;

  @Column({ primary: true, nullable: false })
  permissionId: string;

}