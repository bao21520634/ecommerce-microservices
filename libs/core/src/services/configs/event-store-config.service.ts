import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    EventStoreOptionsFactory,
    EventStoreModuleOptions,
} from '@ecommerce-microservices/event-store';
import { EventstoreConfig } from '@ecommerce-microservices/common';

@Injectable()
export class EventStoreConfigService implements EventStoreOptionsFactory {
    private readonly logger = new Logger(EventStoreConfigService.name);

    constructor(private readonly configService: ConfigService) {}

    createEventStoreOptions(
        connectionName?: string,
    ): EventStoreModuleOptions | Promise<EventStoreModuleOptions> {
        const eventStoreConfig =
            this.configService.get<EventstoreConfig>('eventstore');

        if (!eventStoreConfig) {
            this.logger.error('EventStore configuration not found');
            throw new Error('EventStore configuration not found');
        }

        this.logger.log(
            `Configuring EventStore: ${JSON.stringify(eventStoreConfig)}`,
        );

        return {
            type: 'event-store',
            tcpEndpoint: {
                host: eventStoreConfig.hostname,
                port: eventStoreConfig.tcpPort,
            },
            options: {
                defaultUserCredentials: {
                    username: eventStoreConfig.tcpUsername,
                    password: eventStoreConfig.tcpPassword,
                },
            },
        };
    }
}
