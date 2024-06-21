import { NestFactory } from '@nestjs/core';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('API-teste-fastpay')
    .setDescription('Dcoumentação das rotas do teste')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  //Customização do Swagger
  const customOptions: SwaggerCustomOptions = {
    explorer: false,
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      defaultModelsExpandDepth: 0,
      docExpansion: 'none',
    },
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, customOptions);

  await app.listen('3333');
}
bootstrap();
