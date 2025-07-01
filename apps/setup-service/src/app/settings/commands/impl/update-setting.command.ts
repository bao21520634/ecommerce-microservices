import { Setting } from '@ecommerce-microservices/proto-schema';

export class UpdateSettingCommand {
    constructor(public readonly request: Setting.UpdateSettingInput) {}
}
