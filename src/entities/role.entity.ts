import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, RelationId } from 'typeorm';
import { User } from './user.entity';
import { Permission } from './permission.entity';

export enum UserRole {
  SUPER_ADMIN = 'SuperAdmin',
  ADMIN = 'Admin',
  USER = 'User',
}

@Entity()
export class Role {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({ length: 100, nullable: false })
  text: string;

  @Column({ length: 500, nullable: true })
  description: string;

  @Column({ nullable: false })
  clientId: string;

  @OneToMany(type => User, user => user.roleId)
  users: User[];

  @ManyToMany(type => Permission, permission => permission.roles)
  @JoinTable({
    name: 'role_permission',
    joinColumn: { name: 'roleId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permissionId', referencedColumnName: 'id' },
  })
  permissions: Permission[];

}
