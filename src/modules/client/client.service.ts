import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../../entities/client.entity';
import { RequestContext } from '../../contexts/request.context';
import { UserRole } from '../../entities/role.entity';

@Injectable()
export class ClientService {

  constructor(
    @InjectRepository(Client) private clientRepository: Repository<Client>) {
  }

  async getClients(): Promise<any> {
    const { role, clientId }: any = RequestContext.getCurrentUser();
    if (role === UserRole.SUPER_ADMIN) {
      return await this.clientRepository.find();
    } else {
      return await this.clientRepository.find({ id: clientId });
    }
  }

  async getClient(id: string): Promise<Client> {
    const { role, clientId }: any = RequestContext.getCurrentUser();
    if (role === UserRole.SUPER_ADMIN) {
      return await this.clientRepository.findOne({
        select: ['id', 'name', 'siteUrl', 'phone', 'email'],
        where: { id }
      });
    } else {
      if (id === clientId) {
        return await this.clientRepository.findOne({
          select: ['id', 'name', 'siteUrl', 'phone', 'email'],
          where: { id }
        });
      }
    }
  }

  async createClient(client: Client) {
    await this.clientRepository.save(client);
    return { id: client.id };
  }

  async updateClient(client: Client) {
    await this.clientRepository.save(client);
    return { id: client.id };
  }

  async deleteClient(id: string) {
    await this.clientRepository.delete(id);
    return { id };
  }

}