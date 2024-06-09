import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  CorsConfig,
  NestConfig,
  SwaggerConfig,
} from './config/config.interface';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('config')['nest'];
  const corsConfig = configService.get<CorsConfig>('config')['cors'];
  const swaggerConfig = configService.get<SwaggerConfig>('config')['swagger'];

  if (swaggerConfig.enabled) {
    const options = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version)
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('api', app, document);
  }

  if (corsConfig.enabled) {
    app.enableCors();
  }

  await app.listen(nestConfig.port);
}
bootstrap();
