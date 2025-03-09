import { INestApplication, Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AppUtils } from '@ecommerce-microservices/common';

interface MicroserviceSetupOptions {
    enableNats?: boolean;
    hostname?: string;
}

export async function microserviceSetup(
    app: INestApplication,
    protoPath: string,
    options: MicroserviceSetupOptions = {},
) {
    const configService = app.get(ConfigService);
    const { hostname = 'localhost', enableNats = false } = options;

    // Graceful shutdown
    AppUtils.killAppWithGrace(app);

    // Validate configuration
    const serviceName = configService.get<string>('service.name');
    const servicePort = configService.get<number>('service.port');

    if (!protoPath) {
        throw new Error('Proto path is required for gRPC setup.');
    }

    if (!serviceName || !servicePort) {
        throw new Error(
            'Missing required service configuration: "service.name" or "service.port".',
        );
    }

    // Connect gRPC Microservice
    app.connectMicroservice({
        transport: Transport.GRPC,
        options: {
            url: `${hostname}:${servicePort}`,
            package: serviceName,
            protoPath,
        },
    });

    // Optional NATS Microservice
    if (enableNats) {
        const natsUrl = configService.get<string>('nats.url');
        if (!natsUrl) {
            Logger.error(
                'Missing NATS URL in configuration.',
                'MicroserviceSetup',
            );
        } else {
            app.connectMicroservice({
                transport: Transport.NATS,
                options: {
                    url: natsUrl,
                    queue: `${serviceName}_queue`,
                },
            });
        }
    }

    // Start microservices and HTTP server
    await app.startAllMicroservices();
    await app.listen(0);

    // Log service information
    Logger.log(
        `GRPC ${serviceName} running on port: ${servicePort}`,
        'Bootstrap',
    );

    Logger.log(
        `REST ${serviceName} running on: ${await app.getUrl()}`,
        'Bootstrap',
    );
}
