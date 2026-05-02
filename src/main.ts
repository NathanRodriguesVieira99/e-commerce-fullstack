import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap().catch((err) => {
  Logger.error(`Error when start server: ${err}`);
  process.exit(1);
});
