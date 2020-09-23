// setup support for .env file
require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // allow clients to make request from other hosts
  app.enableCors({
    origin: ['http://localhost:3000', 'http://davidunzue.com'],
  });

  const options = new DocumentBuilder()
    .setTitle('CO2 calculator')
    .setDescription('Calculate the CO2e footprint of your next journey')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.port);
}
bootstrap();
