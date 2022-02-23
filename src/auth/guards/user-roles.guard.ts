import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import type { Request } from 'common/types/request.type';
import { UserRoleEntity } from 'db/entities/user-role.entity';
import { UserRoleEnum } from 'common/enums/user-role.enum';
import { UserPayload } from '../../common/types/user-payload.type';

@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(UserRoleEntity)
    private rolesRepo: Repository<UserRoleEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<UserRoleEnum[]>(
      'user-roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    if (!request?.user) {
      throw new UnauthorizedException(
        'You need to login to be able to do this action.',
      );
    }
    const user = request.user as UserPayload;
    const userRoles = await this.rolesRepo
      .createQueryBuilder('roles')
      .leftJoin('roles.users', 'user')
      .where('user.id = :userId', { userId: user.id })
      .getMany();
    return this.doRolesMatch(userRoles, requiredRoles);
  }

  private doRolesMatch(
    userRoles: UserRoleEntity[],
    requiredRoles: UserRoleEnum[],
  ) {
    if (
      userRoles.findIndex(
        (userRole) => userRole.id == UserRoleEnum.Superadmin,
      ) !== -1
    ) {
      return true;
    }
    return requiredRoles.every((requiredRole) =>
      userRoles.find((userRole) => userRole.id == requiredRole),
    );
  }
}
