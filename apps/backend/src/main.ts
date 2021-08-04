import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { Configuration } from './shared/config.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config: ConfigService<Configuration> = app.get(ConfigService);
  const port = config.get<number>('port');
  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/`);
  });
}

bootstrap();
