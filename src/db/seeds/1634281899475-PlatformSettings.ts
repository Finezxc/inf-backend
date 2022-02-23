import { MigrationInterface, QueryRunner } from 'typeorm';
import { PlatformSettingsEntity } from '../entities/platform-settings.entity';
import { Settings } from '../../common/settings';

export class PlatformSettings1634281899475 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const platformSettingsRepo = queryRunner.connection.getRepository(
      PlatformSettingsEntity,
    );
    const time_limits = queryRunner.connection
      .getRepository(PlatformSettingsEntity)
      .create({
        id: Settings.time_limits,
        customization: 'time_limits',
        value: 1440,
      });
    await platformSettingsRepo.save(time_limits);
    const platform_fees = queryRunner.connection
      .getRepository(PlatformSettingsEntity)
      .create({
        id: Settings.platform_fees,
        customization: 'platform_fees',
        value: 0.03,
      });
    await platformSettingsRepo.save(platform_fees);

    const user_assigned_rewards = queryRunner.connection
      .getRepository(PlatformSettingsEntity)
      .create({
        id: Settings.user_assigned_rewards,
        customization: 'user_assigned_rewards',
        value: 2.5,
      });
    await platformSettingsRepo.save(user_assigned_rewards);

    const reward_percentage_for_responder = queryRunner.connection
      .getRepository(PlatformSettingsEntity)
      .create({
        id: Settings.reward_percentage_for_responder,
        customization: 'reward_percentage_for_responder',
        value: 50,
      });
    await platformSettingsRepo.save(reward_percentage_for_responder);

    const reward_percentage_for_verifier = queryRunner.connection
      .getRepository(PlatformSettingsEntity)
      .create({
        id: Settings.reward_percentage_for_verifier,
        customization: 'reward_percentage_for_verifier',
        value: 50,
      });
    await platformSettingsRepo.save(reward_percentage_for_verifier);

    const rating_restrictions = queryRunner.connection
      .getRepository(PlatformSettingsEntity)
      .create({
        id: Settings.rating_restrictions,
        customization: 'rating_restrictions',
        value: 3,
      });
    await platformSettingsRepo.save(rating_restrictions);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder()
      .delete()
      .from(PlatformSettingsEntity)
      .where('customization = :customization', {
        customization: 'time_limits',
      })
      .execute();

    await queryRunner.connection
      .createQueryBuilder()
      .delete()
      .from(PlatformSettingsEntity)
      .where('customization = :customization', {
        customization: 'platform_fees',
      })
      .execute();

    await queryRunner.connection
      .createQueryBuilder()
      .delete()
      .from(PlatformSettingsEntity)
      .where('customization = :customization', {
        customization: 'user_assigned_rewards',
      })
      .execute();

    await queryRunner.connection
      .createQueryBuilder()
      .delete()
      .from(PlatformSettingsEntity)
      .where('customization = :customization', {
        customization: 'reward_percentage_for_responder',
      })
      .execute();

    await queryRunner.connection
      .createQueryBuilder()
      .delete()
      .from(PlatformSettingsEntity)
      .where('customization = :customization', {
        customization: 'reward_percentage_for_verifier',
      })
      .execute();

    await queryRunner.connection
      .createQueryBuilder()
      .delete()
      .from(PlatformSettingsEntity)
      .where('customization = :customization', {
        customization: 'rating_restrictions',
      })
      .execute();
  }
}
