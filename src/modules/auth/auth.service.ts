import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../entities/role.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        @InjectRepository(Role) private roleRepository: Repository<Role>,
    ) { }
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.getUserByUsername(username);
        if (user && await this.userService.compareHash(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const { role, id: roleId } = await this.roleRepository.findOne({ id: user.roleId });
        const payload = { username: user.username, id: user.id, clientId: user.clientId, role, roleId };
        return this.jwtService.sign(payload);
    }

}
