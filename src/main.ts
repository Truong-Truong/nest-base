import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

import appConfig from './configs/app.config';

async function bootstrap(): Promise<void> {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  await app.listen(appConfig().app_port, () => {
    logger.log(`app start with port: ${appConfig().app_port}`);
  });
}

(async () => {
  await bootstrap();
})();
