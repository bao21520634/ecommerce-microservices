import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SiteSettings {

    @Field(() => String, {defaultValue:'My eCommerce Site',nullable:false})
    name!: string;

    @Field(() => String, {defaultValue:'https://myecommercesite.com',nullable:false})
    url!: string;

    @Field(() => String, {defaultValue:'https://myecommercesite.com/logo.png',nullable:false})
    logo!: string;

    @Field(() => String, {defaultValue:'Best products, best prices!',nullable:false})
    slogan!: string;

    @Field(() => String, {defaultValue:'Welcome to our eCommerce platform.',nullable:false})
    description!: string;

    @Field(() => String, {defaultValue:'shopping, eCommerce, buy online',nullable:false})
    keywords!: string;

    @Field(() => String, {defaultValue:'support@myecommercesite.com',nullable:false})
    email!: string;

    @Field(() => String, {defaultValue:'+1234567890',nullable:false})
    phone!: string;

    @Field(() => String, {defaultValue:'Admin',nullable:false})
    author!: string;

    @Field(() => String, {defaultValue:'© 2025 My eCommerce Site',nullable:false})
    copyright!: string;

    @Field(() => String, {defaultValue:'1234 Market Street, City, Country',nullable:false})
    address!: string;
}
