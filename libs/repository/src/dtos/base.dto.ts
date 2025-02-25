import { BaseEntity } from '../entities';

export class BaseDto {
    id: string | undefined;
    createdAt: Date | undefined;
    updatedAt: Date | undefined;

    constructor(entity: BaseEntity) {
        this.id = entity.id;
        this.createdAt = entity.createdAt;
        this.updatedAt = entity.updatedAt;
    }
}
