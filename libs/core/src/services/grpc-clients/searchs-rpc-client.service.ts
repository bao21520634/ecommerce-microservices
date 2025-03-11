import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { SearchService } from '@ecommerce-microservices/proto-schema';
import { SERVICE_LIST } from '../../constants';

@Injectable()
export class SearchsRpcClientService implements OnModuleInit {
    @Client({
        transport: Transport.GRPC,
        options: {
            package: SERVICE_LIST.search.package,
            protoPath: SERVICE_LIST.search.protoPath,
            url: SERVICE_LIST.search.url,
        },
    })
    private readonly client!: ClientGrpc;

    public svc!: SearchService.SearchServiceClient;

    constructor(private readonly configService: ConfigService) {}

    onModuleInit() {
        this.svc = this.client.getService<SearchService.SearchServiceClient>(
            SERVICE_LIST.search.service,
        );
    }
}
