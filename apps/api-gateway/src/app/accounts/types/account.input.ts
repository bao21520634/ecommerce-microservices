import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { AuthServiceTypes } from '@prisma/client';

registerEnumType(AuthServiceTypes, {
    name: 'AuthServiceTypes',
});

@InputType()
export class LoginParamsInput {
    @Field({ nullable: true })
    accessToken?: string;

    @Field({ nullable: true })
    accessTokenSecret?: string;

    @Field({ nullable: true })
    password?: string;

    @Field({ nullable: true })
    email?: string;
}

@InputType()
export class LoginInput {
    @Field(() => AuthServiceTypes)
    service: AuthServiceTypes;

    @Field(() => LoginParamsInput)
    params: LoginParamsInput;
}

@InputType()
export class RegisterInput {
    @Field()
    firstname: string;

    @Field()
    lastname: string;

    @Field()
    email: string;

    @Field()
    password: string;
}
