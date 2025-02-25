import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import compression from 'compression';
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

        // Set up global middleware
        app.use(helmet()); // Adds security headers
        app.use(compression()); // Compresses responses

        // Configure global validation
        app.useGlobalPipes(
            new ValidationPipe({
                transform: true, // Automatically transform payloads
                whitelist: true, // Strip properties not defined in DTOs
                forbidNonWhitelisted: true, // Throw errors for extra properties
            }),
        );

        // Configure Swagger for API documentation
        const config = new DocumentBuilder()
            .setTitle('API Gateway')
            .setDescription('Microservices API Gateway')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api-docs', app, document);

        // Explicitly configure CORS with more specific options
        app.enableCors({
            origin: configService.get<string[]>('cors.allowedOrigins', ['*']),
            methods: [
                'GET',
                'HEAD',
                'PUT',
                'PATCH',
                'POST',
                'DELETE',
                'OPTIONS',
            ],
            credentials: true,
            maxAge: 3600,
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
        Logger.log(`🚀 Service running on: ${appUrl}`, 'Bootstrap');
        Logger.log(
            `📄 API Documentation available at: ${appUrl}/api-docs`,
            'Bootstrap',
        );
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
