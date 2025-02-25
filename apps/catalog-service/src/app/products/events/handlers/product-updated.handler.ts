import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductUpdatedEvent } from '../impl';

@EventsHandler(ProductUpdatedEvent)
export class ProductUpdatedHandler
    implements IEventHandler<ProductUpdatedEvent>
{
    handle(event: ProductUpdatedEvent): any {
        Logger.log(event, 'ProductUpdatedEvent'); // write here
    }
}
