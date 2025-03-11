import { ElasticsearchConfig } from '@ecommerce-microservices/common';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    ElasticsearchOptionsFactory,
    ElasticsearchModuleOptions,
} from '@nestjs/elasticsearch';

@Injectable()
export class ElasticsearchConfigService implements ElasticsearchOptionsFactory {
    private readonly logger = new Logger(ElasticsearchConfigService.name);

    constructor(private readonly configService: ConfigService) {}

    createElasticsearchOptions(): ElasticsearchModuleOptions {
        const esConfig =
            this.configService.get<ElasticsearchConfig>('elasticsearch');

        if (!esConfig) {
            this.logger.error('Elasticsearch configuration not found');
            throw new Error('Elasticsearch configuration not found');
        }

        this.logger.log(
            `Configuring Elasticsearch: ${JSON.stringify(esConfig)}`,
        );

        return {
            node: esConfig.node,
            auth: {
                username: esConfig.username,
                password: esConfig.password,
            },
            requestTimeout: esConfig.requestTimeout || 30000,
            maxRetries: esConfig.maxRetries || 3,
        };
    }
}
