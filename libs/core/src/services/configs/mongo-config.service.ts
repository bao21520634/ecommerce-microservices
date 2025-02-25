import { DatabaseConfig } from '@ecommerce-microservices/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
    MongooseOptionsFactory,
    MongooseModuleOptions,
} from '@nestjs/mongoose';

@Injectable()
export class MongoConfigService implements MongooseOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createMongooseOptions():
        | Promise<MongooseModuleOptions>
        | MongooseModuleOptions {
        const mongoConfig = this.configService.get<DatabaseConfig>('database');

        if (!mongoConfig) {
            throw new Error('MongoDB configuration not found');
        }

        return {
            uri: `${mongoConfig?.mongodb.uri}${mongoConfig?.mongodb.name}`,
            dbName: mongoConfig?.mongodb.name,
        };
    }
}
