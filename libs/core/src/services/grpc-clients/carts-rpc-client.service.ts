import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { CartService } from '@ecommerce-microservices/proto-schema';
import { SERVICE_LIST } from '../../constants';

@Injectable()
export class CartsRpcClientService implements OnModuleInit {
    @Client({
        transport: Transport.GRPC,
        options: {
            package: SERVICE_LIST.cart.package,
            protoPath: SERVICE_LIST.cart.protoPath,
            url: SERVICE_LIST.cart.url,
        },
    })
    private readonly client!: ClientGrpc;

    public svc!: CartService.CartServiceClient;

    constructor(private readonly configService: ConfigService) {}

    onModuleInit() {
        this.svc = this.client.getService<CartService.CartServiceClient>(
            SERVICE_LIST.cart.service,
        );
    }
}
