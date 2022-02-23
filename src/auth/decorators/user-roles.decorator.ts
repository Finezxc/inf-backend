import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserRolesGuard } from 'auth/guards/user-roles.guard';
import { UserRoleEnum } from 'common/enums/user-role.enum';

export const UserRoles = (...roles: UserRoleEnum[]) => {
  return applyDecorators(
    SetMetadata('user-roles', roles),
    UseGuards(UserRolesGuard),
    ApiUnauthorizedResponse(),
  );
};
