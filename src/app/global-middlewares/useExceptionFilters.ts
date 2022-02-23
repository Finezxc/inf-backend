import { INestApplication } from '@nestjs/common';
import { EntityNotFoundFilter } from 'common/exception-filters/entity-not-found.filter';

import { QueryFailedExceptionFilter } from 'common/exception-filters/query-failed-exception.filter';

export const useExceptionFilters = (app: INestApplication) => {
  app.useGlobalFilters(new QueryFailedExceptionFilter());
  app.useGlobalFilters(new EntityNotFoundFilter());
};
