import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,  
  RemoveEvent,
} from 'typeorm';
import { RequestContext } from '../contexts/request.context';
import { Category } from '../entities/category.entity';
import { checkPermission, getSeq } from '../constants';

@EventSubscriber()
export class CategorySubscriber implements EntitySubscriberInterface<Category> {
    
  listenTo() {
    return Category;
  }

  async beforeInsert(event: InsertEvent<Category>) {
    const { id, clientId }: any = RequestContext.getCurrentUser();
    const humanId = 'CA' + (await getSeq('category'));
    event.entity.clientId = clientId;
    event.entity.userId = id;
    event.entity.createdBy = id;
    event.entity.humanId = humanId;
  }

  beforeUpdate(event: UpdateEvent<Category>) {
    checkPermission(event, Category);
  }

  beforeRemove(event: RemoveEvent<Category>) {
    checkPermission(event, Category);
  }
}
