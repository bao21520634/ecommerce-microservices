import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductCreatedEvent } from '../impl';

@EventsHandler(ProductCreatedEvent)
export class ProductCreatedHandler
    implements IEventHandler<ProductCreatedEvent>
{
    handle(event: ProductCreatedEvent): any {
        Logger.log(event, 'ProductCreatedEvent'); // write here
    }
}
