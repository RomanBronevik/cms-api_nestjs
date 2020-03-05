import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { join } from 'path';
import { Logger } from './modules/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: false,
  });
  app.enableCors();
  app.use(compression());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.useLogger(app.get(Logger));
  await app.listen(3001);
}
bootstrap();
