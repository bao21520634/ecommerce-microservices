import {
    CarouselCreateInput,
    CommonSettingsCreateInput,
    CurrencyCreateInput,
    LanguageCreateInput,
    PaymentMethodCreateInput,
    SiteSettingsCreateInput,
} from '@ecommerce-microservices/graphql-query';
import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class SettingUpdateInput {
    @Field(() => CommonSettingsCreateInput, { nullable: true })
    common?: CommonSettingsCreateInput;

    @Field(() => SiteSettingsCreateInput, { nullable: true })
    site?: SiteSettingsCreateInput;

    @Field(() => [CarouselCreateInput], { nullable: false })
    carousels!: Array<CarouselCreateInput>;

    @Field(() => [LanguageCreateInput], { nullable: false })
    availableLanguages!: Array<LanguageCreateInput>;

    @Field(() => String, { nullable: true })
    defaultLanguage?: string;

    @Field(() => [CurrencyCreateInput], { nullable: false })
    availableCurrencies!: Array<CurrencyCreateInput>;

    @Field(() => String, { nullable: true })
    defaultCurrency?: string;

    @Field(() => [PaymentMethodCreateInput], { nullable: false })
    availablePaymentMethods!: Array<PaymentMethodCreateInput>;

    @Field(() => String, { nullable: true })
    defaultPaymentMethod?: string;
}
