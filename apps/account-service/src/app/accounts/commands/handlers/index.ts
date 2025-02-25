import { LoginUserHandler } from './login-user.handler';
import { RegisterUserHandler } from './register-user.handler';
import { VerifyEmailHandler } from './verify-email.handler';
import { UpdateUserHandler } from './update-user.handler';
import { ForgotPasswordHandler } from './forgot-password.handler';
import { ResendVerificationEmailHandler } from './resend-verification-email.handler';

export const AccountCommandHandlers = [
    LoginUserHandler,
    RegisterUserHandler,
    VerifyEmailHandler,
    ResendVerificationEmailHandler,
    UpdateUserHandler,
    ForgotPasswordHandler,
];
