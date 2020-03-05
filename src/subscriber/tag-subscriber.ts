import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent } from "typeorm";
import { RequestContext } from "../contexts/request.context";
import { Tag } from "../entities/tag.entity";
import { checkPermission } from "../constants";

@EventSubscriber()
export class TagSubscriber implements EntitySubscriberInterface<Tag> {

    listenTo() {
        return Tag;
    }

    beforeInsert(event: InsertEvent<Tag>) {
        const { id }: any = RequestContext.getCurrentUser();
        event.entity.userId = id;
        event.entity.createdBy = id;
    }

    async beforeUpdate(event: UpdateEvent<Tag>) {
        await checkPermission(event, Tag, 'userId');
    }

    async beforeRemove(event: UpdateEvent<Tag>) {
        await checkPermission(event, Tag, 'userId');
    }

}