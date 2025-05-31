
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { BasicAuthMiddlewareFactory } from './shared/middleware/basic.auth.middleware.factory';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const swaggerPath = 'api/v1/docs';
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  // Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.use(swaggerPath, BasicAuthMiddlewareFactory(configService, 'docs'));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Star wars api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPath, app, documentFactory, {
    customSiteTitle: 'Star wars api',
  });

  // Set file size limit
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  // CORS
  app.enableCors({ exposedHeaders: ['Content-Disposition'] });

  await app.listen(process.env.PORT ? +process.env.PORT : 8080);
}
bootstrap();
