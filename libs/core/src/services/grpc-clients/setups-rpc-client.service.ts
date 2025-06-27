import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { SetupService } from '@ecommerce-microservices/proto-schema';
import { SERVICE_LIST } from '../../constants';

@Injectable()
export class SetupsRpcClientService implements OnModuleInit {
    @Client({
        transport: Transport.GRPC,
        options: {
            package: SERVICE_LIST.setup.package,
            protoPath: SERVICE_LIST.setup.protoPath,
            url: SERVICE_LIST.setup.url,
        },
    })
    private readonly client!: ClientGrpc;

    public svc!: SetupService.SetupServiceClient;

    constructor(private readonly setupService: ConfigService) {}

    onModuleInit() {
        this.svc = this.client.getService<SetupService.SetupServiceClient>(
            SERVICE_LIST.setup.service,
        );
    }
}
