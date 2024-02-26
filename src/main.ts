import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  const config = new DocumentBuilder()
    .setTitle('Mi API')
    .setDescription('Red social')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )
  SwaggerModule.setup('', app, document);
  await app.listen(AppModule.port);
}
bootstrap();
