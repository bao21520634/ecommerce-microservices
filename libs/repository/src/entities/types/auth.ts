export interface LocalAuthStruct {
    hashed: string;
}

export interface SocialAuthStruct {
    userId: string;
    email: string;
    accessToken?: string;
}

export interface AuthServices {
    password?: LocalAuthStruct;
    google?: SocialAuthStruct;
}

export interface Settings {
    stripeId?: string;
}
