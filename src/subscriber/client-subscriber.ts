import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent } from "typeorm";
import { RequestContext } from "../contexts/request.context";
import { Client } from "../entities/client.entity";
import { getSeq, checkPermission } from "../constants";

@EventSubscriber()
export class ClientSubscriber implements EntitySubscriberInterface<Client> {

  listenTo() {
    return Client;
  }

  async beforeInsert(event: InsertEvent<Client>) {
    try {
      const user: any = RequestContext.getCurrentUser();
      event.entity.createdBy = user.id;
    } catch (error) {
      console.log(error);
    } finally {
      const humanId = 'C' + (await getSeq('client'));
      event.entity.humanId = humanId;
    }
  }

  async beforeUpdate(event: UpdateEvent<Client>) {
    await checkPermission(event, Client, 'id');
  }

}