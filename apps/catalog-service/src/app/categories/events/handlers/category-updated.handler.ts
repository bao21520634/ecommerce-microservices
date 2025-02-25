import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CategoryUpdatedEvent } from '../impl';

@EventsHandler(CategoryUpdatedEvent)
export class CategoryUpdatedHandler
    implements IEventHandler<CategoryUpdatedEvent>
{
    handle(event: CategoryUpdatedEvent): any {
        Logger.log(event, 'CategoryUpdatedEvent'); // write here
    }
}
