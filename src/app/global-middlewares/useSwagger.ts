import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigEnvEnum } from 'common/enums/config-env.enum';

export const useSwagger = (app: INestApplication) => {
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Infomatix')
    .setDescription('Infomatix API Reference')
    .setVersion('1.0')
    .addCookieAuth(
      configService.get<string>(ConfigEnvEnum.REDIS_AUTH_COOKIE_NAME),
      {
        type: 'apiKey',
        name: configService.get<string>(ConfigEnvEnum.REDIS_AUTH_COOKIE_NAME),
        description: 'User auth cookie',
      },
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);
};
