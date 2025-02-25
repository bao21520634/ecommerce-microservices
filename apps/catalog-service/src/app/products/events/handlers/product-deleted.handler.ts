import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductDeletedEvent } from '../impl';

@EventsHandler(ProductDeletedEvent)
export class ProductDeletedHandler
    implements IEventHandler<ProductDeletedEvent>
{
    handle(event: ProductDeletedEvent): any {
        Logger.log(event, 'ProductDeletedEvent'); // write here
    }
}
