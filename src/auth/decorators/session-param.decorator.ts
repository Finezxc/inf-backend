import { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { Request } from 'common/types/request.type';
import { SessionType } from 'common/types/session.type';

export const SessionParam = createParamDecorator(
  (_, context: ExecutionContext): SessionType => {
    return (context.switchToHttp().getRequest() as Request).session;
  },
);
