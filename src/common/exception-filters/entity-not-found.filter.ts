import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';

import { ResponseType } from 'common/types/response.type';
import { ErrorPayload } from 'common/types/error-payload.type';

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements ExceptionFilter {
  catch(_: EntityNotFoundError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse() as ResponseType;

    response.status(404).json({
      message: 'Entry not found.',
      isNotHumanreadable: false,
    } as ErrorPayload);
  }
}
