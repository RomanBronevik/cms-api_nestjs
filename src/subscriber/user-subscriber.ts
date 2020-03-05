import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';
import { RequestContext } from '../contexts/request.context';
import { User } from '../entities/user.entity';
import { getSeq } from '../constants';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {

  listenTo() {
    return User;
  } 

  async beforeInsert(event: InsertEvent<User>) {
    try {
      const { id }:any = RequestContext.getCurrentUser();
      event.entity.createdBy = id; 
    } catch (error) {
      console.log(error);
    }finally{
      const humanId = 'U' + (await getSeq('user'));
      event.entity.humanId = humanId;

    }    
  }
}
