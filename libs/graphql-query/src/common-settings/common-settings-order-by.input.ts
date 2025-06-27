import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class CommonSettingsOrderByInput {

    @Field(() => SortOrder, {nullable:true})
    pageSize?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    isMaintenanceMode?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    freeShippingMinPrice?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    defaultTheme?: `${SortOrder}`;

    @Field(() => SortOrder, {nullable:true})
    defaultColor?: `${SortOrder}`;
}
