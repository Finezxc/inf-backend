import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import { SessionsService } from 'auth/services/sessions.service';
import { ConfigEnvEnum } from 'common/enums/config-env.enum';

export const useRedisSessions = (app: INestApplication) => {
  const configService = app.get(ConfigService);
  const sessionsService = app.get(SessionsService);

  app.use(
    session({
      store: sessionsService.store,
      secret: configService.get<string>(ConfigEnvEnum.REDIS_SECRET),
      resave: false,
      saveUninitialized: false,
      name: configService.get<string>(ConfigEnvEnum.REDIS_AUTH_COOKIE_NAME),

      cookie: {
        httpOnly: true,
        secure: configService.get<string>('NODE_ENV') === 'production',
        sameSite: 'lax',
      },
    }),
  );
};
