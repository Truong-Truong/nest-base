import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

import appConfig from '@app/configs/app.config';

async function bootstrap(): Promise<void> {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(appConfig().app_port, () => {
    logger.log(`app start with port: ${appConfig().app_port}`);
  });
}

(async () => {
  await bootstrap();
})();
