import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as swStats from 'swagger-stats';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as apiSpecif from './swagger/api-json.json';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Gestion des Associations')
    .setDescription('Descriptions des APIs de la gestion des associations')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(swStats.getMiddleware({ swaggerSpec: apiSpecif }));
  await app.listen(3000);
}
bootstrap();
