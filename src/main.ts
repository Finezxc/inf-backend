import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { initializeTransactionalContext } from 'typeorm-transactional-cls-hooked';

import { AppModule } from 'app/app.module';
import { useExceptionFilters } from 'app/global-middlewares/useExceptionFilters';
import { useRedisSessions } from 'app/global-middlewares/useRedisSessions';
import { useSwagger } from 'app/global-middlewares/useSwagger';
import { useValidation } from 'app/global-middlewares/useValidation';
import { ConfigEnvEnum } from 'common/enums/config-env.enum';

initializeTransactionalContext();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  app.enableCors({
    credentials: true,
    origin: configService.get<string>(ConfigEnvEnum.APP_FRONTEND_URL),
  });
  useRedisSessions(app);
  useSwagger(app);
  useValidation(app);
  useExceptionFilters(app);

  await app.listen(configService.get<number>(ConfigEnvEnum.APP_PORT));
}

bootstrap();
