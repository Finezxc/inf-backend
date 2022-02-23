import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import type { Request } from 'common/types/request.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    try {
      const authHeader = request.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (!bearer || !token) {
        throw new UnauthorizedException({ message: 'UNAUTHORIZED' });
      }
      request.user = this.jwtService.verify(token);
      return true;
    } catch (error) {
      throw new UnauthorizedException({ message: 'UNAUTHORIZED' });
    }

    return true;
  }
}
