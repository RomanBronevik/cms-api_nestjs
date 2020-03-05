import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from '../../entities/tag.entity';
import { RequestContext } from '../../contexts/request.context';
import { UserRole } from '../../entities/role.entity';

@Injectable()
export class TagService {

  constructor(
    @InjectRepository(Tag) private tagRepository: Repository<Tag>, ) {
  }

  async getTags() {
    const { role, id: userId }: any = RequestContext.getCurrentUser();
    if (role === UserRole.SUPER_ADMIN) {
      return await this.tagRepository.find();
    } else {
      return this.tagRepository.find({ userId });
    }
  }

  async getTag(id: string) {
    const { role, id: userId }: any = RequestContext.getCurrentUser();
    if (role === UserRole.SUPER_ADMIN) {
      return await this.tagRepository.findOne({
        select: ['id', 'name', 'description'],
        where: { id }
      });
    } else {
      return this.tagRepository.findOne({
        select: ['id', 'name', 'description'],
        where: { id, userId }
      });
    }
  }

  async createTag(tag: Tag) {
    await this.tagRepository.save(tag);
    return { id: tag.id };
  }

  async updateTag(tag: Tag) {
    await this.tagRepository.save(tag);
    return { id: tag.id };
  }

  async deleteTag(tag: Tag) {
    await this.tagRepository.remove(tag);
    return { id: tag.id }
  }

}