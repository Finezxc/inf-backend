import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { Request } from '../../common/types/request.type';
import { UserPayload } from '../../common/types/user-payload.type';
import { UserRepository } from '../../account/repositories/user.repository';
import { PlatformSettingsRepository } from '../../admin/repositories/platform-settings.repository';
import { Settings } from '../../common/settings';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

@Injectable()
export class UserRatingGuard implements CanActivate {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly platformSettings: PlatformSettingsRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user as UserPayload;
    const userModel = await this.userRepo.findOne(user.id);
    const platformSettings = await this.platformSettings.findOne(
      Settings.rating_restrictions,
    );
    if (userModel.rating < platformSettings.value) {
      throw new HttpException('User has a low rating', HttpStatus.FORBIDDEN);
    }
    return true;
  }
}
