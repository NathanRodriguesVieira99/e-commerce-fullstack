import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  /* Pipes */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  /* CORS */
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') ?? 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  /*  Swagger */
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API Documentation for the application')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        name: 'JWT',
        bearerFormat: 'JWT',
        scheme: 'bearer',
        description: 'Enter JWT Token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addBearerAuth(
      {
        type: 'http',
        name: 'Refresh-JWT',
        bearerFormat: 'JWT',
        scheme: 'bearer',
        description: 'Enter refresh JWT Token',
        in: 'header',
      },
      'Refresh-JWT',
    )
    .addServer('http://localhost:3001', 'Development server')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customSiteTitle: 'API Documentation',
    customfavIcon: 'https://nestjs.com/img/logo-small.svg',
    customCss: `
    .swagger-ui .topbar {display:none} 
    .swagger-ui .info {margin: 50px 0;}
     swagger-ui .info .title {color: #4a90e2;}
     `,
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap().catch((err) => {
  Logger.error(`Error when start server: ${err}`);
  process.exit(1);
});
