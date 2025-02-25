import { Request as ExpressRequest } from 'express';
import { Logger } from '@nestjs/common';

export class IdentifyMachineUtils {
    constructor(readonly req: ExpressRequest) {}

    sender() {
        const ip =
            this.req.headers['x-forwarded-for'] ||
            this.req.socket.remoteAddress;
        Logger.log(ip, this.constructor.name);

        return {
            ip: 'free',
            userAgent: 'free',
        };
    }
}
