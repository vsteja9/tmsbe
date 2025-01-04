import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { Logger as nestLogger } from '@nestjs/common';

// logging tutorial that I followed..  https://riochndr.com/posts/effective-and-simple-logging-in-nestjs-using-pino-logger/

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useLogger(app.get(Logger));
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(`TMS API's`)
    .setDescription(
      'APIs for Task Management System.All the APIs are protected.Only Admins can access user APIs.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options, SwaggerOptions);
  // Swagger path: http://localhost:3000/api
  SwaggerModule.setup(`/api`, app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  // app.enableCors();
  // the swagger module initialization should before app.listens..
  await app.listen(process.env.PORT ?? 3001);
  const logger = new nestLogger('bootstrap');
  logger.log(`Application is running on ${await app.getUrl()}`);
}
bootstrap();

// swagger options is for route names gives only methodname without controller name.(without this the route looks like: http://localhost:3000/api#/App/AppController_getHello)
const SwaggerOptions: SwaggerDocumentOptions = {
  operationIdFactory: (_controllerKey: string, methodKey: string) => methodKey,
};
