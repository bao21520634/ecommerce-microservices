import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductCategoryUpdatedEvent } from '../impl';

@EventsHandler(ProductCategoryUpdatedEvent)
export class ProductCategoryUpdatedHandler
    implements IEventHandler<ProductCategoryUpdatedEvent>
{
    handle(event: ProductCategoryUpdatedEvent): any {
        Logger.log(event, 'ProductCategoryUpdatedEvent'); // write here
    }
}
