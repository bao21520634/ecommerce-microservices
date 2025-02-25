import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { CatalogService } from '@ecommerce-microservices/proto-schema';
import { SERVICE_LIST } from '../../constants';

@Injectable()
export class CatalogsRpcClientService implements OnModuleInit {
    @Client({
        transport: Transport.GRPC,
        options: {
            package: SERVICE_LIST.catalog.package,
            protoPath: SERVICE_LIST.catalog.protoPath,
            url: SERVICE_LIST.catalog.url,
        },
    })
    private readonly client!: ClientGrpc;

    public svc!: CatalogService.CatalogService<any>;

    constructor(private readonly configService: ConfigService) {}

    onModuleInit() {
        // Get service configuration
        const serviceHost = this.configService.get<string>(
            'service.discoveryHost',
        );
        const servicePort = this.configService.get<number>('service.port');

        // Override client options with configuration
        const clientOptions = {
            transport: Transport.GRPC,
            options: {
                package: SERVICE_LIST.catalog.package,
                protoPath: SERVICE_LIST.catalog.protoPath,
                url: `${serviceHost}:${servicePort}`,
            },
        };

        // Initialize the client with the service interface
        this.svc = this.client.getService<CatalogService.CatalogService<any>>(
            SERVICE_LIST.catalog.service,
        );
    }
}
