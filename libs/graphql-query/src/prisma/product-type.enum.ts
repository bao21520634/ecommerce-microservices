import { registerEnumType } from '@nestjs/graphql';

export enum ProductType {
    Simple = "Simple",
    Variant = "Variant"
}


registerEnumType(ProductType, { name: 'ProductType', description: undefined })
