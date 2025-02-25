import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CategoryDeletedEvent } from '../impl';

@EventsHandler(CategoryDeletedEvent)
export class CategoryDeletedHandler
    implements IEventHandler<CategoryDeletedEvent>
{
    handle(event: CategoryDeletedEvent): any {
        Logger.log(event, 'CategoryDeletedEvent'); // write here
    }
}
