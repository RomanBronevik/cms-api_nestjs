import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from 'typeorm';
import { Article } from '../entities/article.entity';
import { RequestContext } from '../contexts/request.context';
import { getSeq, checkPermission } from '../constants';

@EventSubscriber()
export class ArticleSubscriber implements EntitySubscriberInterface<Article> {
  listenTo() {
    return Article;
  }

  async beforeInsert(event: InsertEvent<Article>) {
    const { id, clientId }: any = RequestContext.getCurrentUser();
    const humanId = 'A' + (await getSeq('article'));
    event.entity.clientId = clientId;
    event.entity.userId = id;
    event.entity.createdBy = id;
    event.entity.humanId = humanId;
  }

  beforeUpdate(event: UpdateEvent<Article>) {
    checkPermission(event, Article);
  }

  beforeRemove(event: RemoveEvent<Article>) {
    checkPermission(event, Article);
  }
}
