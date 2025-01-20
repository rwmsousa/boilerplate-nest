import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SeederService } from './seeder/seeder.service';
import { AppDataSource } from './data-source';
import { SwaggerDocumentOptions } from './swagger/swagger-document-options';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();
  const seeder = app.get(SeederService);
  await seeder.seed();

  app.enableCors({
    origin: [process.env.FRONTEND_URL],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
  });

  const config = new DocumentBuilder()
    .setTitle(`${process.env.COMPANY_NAME} API`)
    .setDescription('Rest API with NestJS, Typeorm and Postgres')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerOptions: SwaggerDocumentOptions = {
    include: [],
    extraModels: [],
    ignoreGlobalPrefix: false,
    deepScanRoutes: true,
    operationIdFactory: (
      controllerKey: string,
      methodKey: string,
      version?: string,
    ) => `${controllerKey}_${methodKey}_${version}`,
    linkNameFactory: (
      controllerKey: string,
      methodKey: string,
      fieldKey: string,
    ) => `${controllerKey}_${methodKey}_from_${fieldKey}`,
    autoTagControllers: true,
  };

  const document = SwaggerModule.createDocument(app, config, swaggerOptions);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
