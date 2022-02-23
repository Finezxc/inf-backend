import { INestApplication } from '@nestjs/common';

import { ValidationPipe } from 'common/pipes/validation-pipe.pipe';

export const useValidation = (app: INestApplication) => {
  app.useGlobalPipes(new ValidationPipe());
};
