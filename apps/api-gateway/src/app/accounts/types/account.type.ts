import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Tokens {
    @Field()
    refreshToken: string;

    @Field()
    accessToken: string;
}

@ObjectType()
export class User {
    @Field(() => ID)
    id: string;

    @Field()
    username: string;

    @Field()
    primaryEmail: string;

    @Field()
    fullName: string;

    @Field({ nullable: true })
    phone?: string;

    @Field({ nullable: true })
    address?: string;

    @Field({ nullable: true })
    sex?: string;

    @Field({ nullable: true })
    dob?: string;

    @Field({ nullable: true })
    bio?: string;

    @Field()
    role: string;
}

@ObjectType()
export class ExpirableTokens {
    @Field({ nullable: true })
    sub: string;

    @Field({ nullable: true })
    value: string;

    @Field({ nullable: true })
    iat: string;
}

@ObjectType()
export class VerificationLinkInfo {
    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    verificationCode: string;
}

@ObjectType()
export class AccountMutations {}

@Directive(`@key(fields: "id")`)
@ObjectType()
export class Account {
    @Field(() => ID)
    id: string;

    @Field()
    user?: User;

    @Field()
    tokens?: Tokens;
}

@ObjectType()
export class AccountRegisterResponse {
    @Field()
    activationLink?: string;
}

@ObjectType()
export class BooleanPayload {
    @Field()
    success: boolean;
}
