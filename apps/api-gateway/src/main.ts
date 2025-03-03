import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app/app.module';
import { AppUtils } from '@ecommerce-microservices/common';

async function bootstrap() {
    try {
        // Create the NestJS application with additional options
        const app = await NestFactory.create(AppModule, {
            bufferLogs: true,
            cors: true,
        });

        // Get the configuration service
        const configService = app.get(ConfigService);

        app.use(
            helmet({
                contentSecurityPolicy: false, // Disable CSP restrictions for GraphQL playground
                crossOriginEmbedderPolicy: false,
            }),
        );

        // Explicitly configure CORS with more specific options
        app.enableCors({
            origin: '*',
            credentials: true,
        });

        // Graceful shutdown
        AppUtils.killAppWithGrace(app);

        // Determine port
        const port =
            configService.get<number>('service.port') ||
            (await (await import('get-port')).default());

        // Start the application
        await app.listen(port, '0.0.0.0');

        // Log application details
        const appUrl = await app.getUrl();
        Logger.log(`Service running on: ${appUrl}`, 'Bootstrap');
    } catch (error) {
        // Centralized error handling for bootstrap process
        const logger = new Logger('Bootstrap');
        logger.error('Failed to start application', error.stack);
        console.log(error);
        process.exit(1);
    }
}

// Run the bootstrap function
bootstrap();
