import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LogInterceptor } from './interceptors/log.inteceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  //Modo global de inserir um inteceptador, para todas as rotas
  //app.useGlobalInterceptors(new LogInterceptor);
  await app.listen(3000);
}
bootstrap();
