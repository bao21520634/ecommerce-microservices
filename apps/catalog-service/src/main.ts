import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { microserviceSetup, SERVICE_LIST } from '@ecommerce-microservices/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
    );

    await microserviceSetup(app, SERVICE_LIST.catalog.protoPath, {
        enableNats: true,
    });
}

bootstrap();
