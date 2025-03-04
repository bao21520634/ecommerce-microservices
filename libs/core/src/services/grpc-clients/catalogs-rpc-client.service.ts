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

    public svc!: CatalogService.CatalogServiceClient;

    constructor(private readonly configService: ConfigService) {}

    onModuleInit() {
        this.svc = this.client.getService<CatalogService.CatalogServiceClient>(
            SERVICE_LIST.catalog.service,
        );
    }
}
