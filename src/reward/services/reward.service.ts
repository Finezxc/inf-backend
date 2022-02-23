import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AdminPaymentSettingsEntity } from 'db/entities/admin-payment-settings.entity';
import { RequestEntity } from 'db/entities/request.entity';
import { UserEntity } from 'db/entities/user.entity';
import { ResponderPaymentStrategyTypeEnum } from 'common/enums/responder-paymnet-strategy-type.enum';
import { ConfigService } from '@nestjs/config';
import { ConfigEnvEnum } from 'common/enums/config-env.enum';

@Injectable()
export class RewardService {
  constructor(
    @InjectRepository(AdminPaymentSettingsEntity)
    private paymentSettingsRepo: Repository<AdminPaymentSettingsEntity>,
    private configService: ConfigService,
  ) {}

  async calculateAbsoluteRewardShares(
    request: RequestEntity,
    responder: UserEntity,
  ) {
    const settings = await this.paymentSettingsRepo.findOne({
      isCurrent: true,
    });

    let platformFee = request.reward * settings.platformFeeFactor;
    const rewardRest = request.reward - platformFee;

    const responderBaseReward = rewardRest * settings.responderRewardFactor;
    const verifierReward = rewardRest * settings.verifierRewardFactor;

    let responderReward = responderBaseReward;

    if (
      settings.responderPaymentStrategy.id ===
      ResponderPaymentStrategyTypeEnum.RatingDependent
    ) {
      responderReward =
        responderBaseReward *
        (responder.rating /
          this.configService.get<number>(ConfigEnvEnum.APP_MAX_RATING));

      platformFee += responderBaseReward - responderReward;
    }

    return { platformFee, verifierReward, responderReward };
  }
}
