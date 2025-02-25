import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductCategoryDeletedEvent } from '../impl';

@EventsHandler(ProductCategoryDeletedEvent)
export class ProductCategoryDeletedHandler
    implements IEventHandler<ProductCategoryDeletedEvent>
{
    handle(event: ProductCategoryDeletedEvent): any {
        Logger.log(event, 'ProductCategoryDeletedEvent'); // write here
    }
}
