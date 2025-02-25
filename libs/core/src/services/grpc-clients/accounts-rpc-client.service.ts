import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AccountService } from '@ecommerce-microservices/proto-schema';
import { SERVICE_LIST } from '../../constants';

@Injectable()
export class AccountsRpcClientService implements OnModuleInit {
    @Client({
        transport: Transport.GRPC,
        options: {
            package: SERVICE_LIST.account.package,
            protoPath: SERVICE_LIST.account.protoPath,
            url: SERVICE_LIST.account.url,
        },
    })
    private readonly client!: ClientGrpc;

    public svc!: AccountService.AccountService<any>;

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
                package: SERVICE_LIST.account.package,
                protoPath: SERVICE_LIST.account.protoPath,
                url: `${serviceHost}:${servicePort}`,
            },
        };

        // Initialize the client with the service interface
        this.svc = this.client.getService<AccountService.AccountService<any>>(
            SERVICE_LIST.account.service,
        );
    }
}
