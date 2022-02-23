import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { UserAuthGuard } from 'auth/guards/user-auth.guard';
import { UserRoleEnum } from 'common/enums/user-role.enum';
import { UserRoles } from 'auth/decorators/user-roles.decorator';

export function UserAuth(...roles: UserRoleEnum[]) {
  return applyDecorators(
    UseGuards(UserAuthGuard),
    UserRoles(...roles),
    ApiCookieAuth(),
    ApiUnauthorizedResponse(),
  );
}
