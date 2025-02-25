import { Controller, Get, UseGuards } from '@nestjs/common';
import * as passport from 'passport';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('account')
export class AccountController {
    @ApiOkResponse()
    @UseGuards(AuthGuard('google'))
    @Get('/google')
    googleAuth() {
        passport.authenticate('google');
    }
}
