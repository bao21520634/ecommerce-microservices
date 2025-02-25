import * as bcrypt from 'bcrypt';
import { Base64 } from 'js-base64';

export const generateHashedPassword: (password: string) => string = (
    password,
) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

export const validPassword = (password: any, passwordHash: any) => {
    return bcrypt.compareSync(password, passwordHash);
};

export function toCursor({ value }: any) {
    return Base64.encode(value);
}

export function fromCursor(str: string): string | null {
    const value = Base64.decode(str);
    if (value) {
        return value;
    } else {
        return null;
    }
}
