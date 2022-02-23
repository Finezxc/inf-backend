import { ResponderPaymentStrategyTypeEnum } from 'common/enums/responder-paymnet-strategy-type.enum';
import { AdminPaymentSettingsEntity } from 'db/entities/admin-payment-settings.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdminPaymentSettings1625646657707 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const settingsRepo = queryRunner.connection.getRepository(
      AdminPaymentSettingsEntity,
    );

    const settings = settingsRepo.create({
      id: 1,
      isCurrent: true,
      defaultReward: 2,
      defaultTimeLimit: 1209600000,
      platformFeeFactor: 0.1,
      responderRewardFactor: 0.5,
      verifierRewardFactor: 0.5,
      responderPaymentStrategy: {
        id: ResponderPaymentStrategyTypeEnum.SimpleRatio,
      },
    });

    await settingsRepo.save(settings);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder()
      .delete()
      .from(AdminPaymentSettingsEntity)
      .where('id = :id', {
        id: 1,
      })
      .execute();
  }
}
