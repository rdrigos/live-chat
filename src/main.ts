import { AppModule } from '@/app.module';
import { EnvironmentService } from '@/infrastructure/environment/environment.service';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

(async () => {
  const app = await NestFactory.create(AppModule);

  const env = app.get(EnvironmentService);

  // Configures the OpenAPI (Swagger) documentation builder
  const document = new DocumentBuilder()
    .setTitle(env.get('NAME'))
    .setDescription(env.get('DESCRIPTION'))
    .setVersion(env.get('VERSION'))
    .build();
  const documentation = SwaggerModule.createDocument(app, document);

  // Defines the "/docs" endpoint to serve Scalar's documentation UI
  app.use('/docs', apiReference({ spec: { content: documentation } }));

  await app.listen(env.get('PORT'));
})();
