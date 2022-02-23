import { Injectable } from '@nestjs/common';

import { UserEntity } from 'db/entities/user.entity';
import { UserRepository } from 'account/repositories/user.repository';
import { CryptoUtilsService } from 'common/services/crypto-utils.service';

@Injectable()
export class UserAuthService {
  constructor(
    private userRepo: UserRepository,
    private cryptoUtilsService: CryptoUtilsService,
  ) {}

  /**
   * Checks is user able to login. Returns null in case of failure.
   */
  async verifyLogin(
    email: string,
    password: string,
    relations?: string[],
  ): Promise<UserEntity | null> {
    const user = await this.userRepo.findOne({ where: { email }, relations });

    if (!user) {
      return null;
    }

    const isCredentialsValid = await this.cryptoUtilsService.verifyHash(
      password,
      user.passwordHash,
    );

    if (!isCredentialsValid) {
      return null;
    }

    return user;
  }
}
