import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductCategoryCreatedEvent } from '../impl';

@EventsHandler(ProductCategoryCreatedEvent)
export class ProductCategoryCreatedHandler
    implements IEventHandler<ProductCategoryCreatedEvent>
{
    handle(event: ProductCategoryCreatedEvent): any {
        Logger.log(event, 'ProductCategoryCreatedEvent'); // write here
    }
}
