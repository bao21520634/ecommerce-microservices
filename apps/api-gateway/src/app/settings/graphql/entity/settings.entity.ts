import {
    PaymentMethod,
    Currency,
    Language,
    Carousel,
    SiteSettings,
    CommonSettings,
} from '@ecommerce-microservices/graphql-query';
import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';

@ObjectType()
export class Setting {
    @Field(() => ID, { nullable: false })
    id!: string;

    @Field(() => Date, { nullable: false })
    createdAt!: Date;

    @Field(() => Date, { nullable: false })
    updatedAt!: Date;

    @Field(() => CommonSettings, { nullable: false })
    common?: CommonSettings;

    @Field(() => SiteSettings, { nullable: false })
    site?: SiteSettings;

    @Field(() => [Carousel], { nullable: true })
    carousels?: Array<Carousel>;

    @Field(() => [Language], { nullable: true })
    availableLanguages?: Array<Language>;

    @Field(() => String, { defaultValue: 'en-US', nullable: false })
    defaultLanguage!: string;

    @Field(() => [Currency], { nullable: true })
    availableCurrencies?: Array<Currency>;

    @Field(() => String, { defaultValue: 'USD', nullable: false })
    defaultCurrency!: string;

    @Field(() => [PaymentMethod], { nullable: true })
    availablePaymentMethods?: Array<PaymentMethod>;

    @Field(() => String, { defaultValue: 'PayPal', nullable: false })
    defaultPaymentMethod!: string;
}
