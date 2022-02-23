import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminPaymentSettingsEntity } from 'db/entities/admin-payment-settings.entity';
import { RewardService } from 'reward/services/reward.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminPaymentSettingsEntity])],
  providers: [RewardService],
  exports: [RewardService],
})
export class RewardModule {}
