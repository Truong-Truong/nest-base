import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const C_PORT = 3333;
  await app.listen(C_PORT, () => {
    console.log(`app start with port: ${C_PORT}`);
  });
}

(async () => {
  await bootstrap();
})();
