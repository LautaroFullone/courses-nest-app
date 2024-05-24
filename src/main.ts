import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  // app.enableCors()
  app.use(json({ limit: '60mb' }))

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI
  })

  const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('Documentacion NESTJS api')
  .setDescription('Esta es mi primer api en nest')
  .addTag('courses')  
  .addTag('videos')
  .addTag('awards')
  .addTag('auth')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  console.log('__ENV__', process.env.PORT)
  
  app.useGlobalPipes(new ValidationPipe()) //para aplicar las validationes de dtos a todos los models
  
  await app.listen(3000);
}
bootstrap();
