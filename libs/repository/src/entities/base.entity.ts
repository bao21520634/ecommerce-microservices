import { AggregateRoot } from '@nestjs/cqrs';
import { BaseDto } from '../dtos';

export abstract class BaseEntity<
    T extends BaseDto = BaseDto,
> extends AggregateRoot {
    id?: string;

    createdBy?: string;

    createdAt?: Date;

    updatedAt?: Date;

    deletedAt?: Date;

    deleted?: boolean = false;

    version?: number;

    toDtoClass?: new (entity: BaseEntity, options?: any) => T;
}
