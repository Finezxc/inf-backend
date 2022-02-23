import { hash } from 'argon2';
import { MigrationInterface, QueryRunner } from 'typeorm';

import { UserApprovalStatusEnum } from 'common/enums/user-approval-status.enum';
import { UserRoleEnum } from 'common/enums/user-role.enum';
import { UserEntity } from 'db/entities/user.entity';

export class CreateSuperadmin1625220810494 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepo = queryRunner.connection.getRepository(UserEntity);

    const password = process.env.APP_SUPERADMIN_PASSWORD;

    if (!password) {
      throw new Error('env APP_SUPERADMIN_PASSWORD is not set!');
    }
    const passwordHash = await hash(password);

    const user = queryRunner.connection.getRepository(UserEntity).create({
      id: 1,
      roles: [{ id: UserRoleEnum.Superadmin }],
      approvalStatus: { id: UserApprovalStatusEnum.Approved },
      isEmailConfirmed: true,
      isRegistrationCompleted: true,
      bio: '',
      birthDate: new Date('1900'),
      email: 'support@infomatix.io',
      firstName: 'Infomatix',
      lastName: 'Admin',
      jobTitle: 'Infomatix administrator',
      location: '',
      passwordHash,
      lastSignedIn: new Date(),
      rating: Number(process.env.APP_MAX_RATING),
      cryptoCurrencyWalletAddress: '',
    });
    await userRepo.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.connection
      .createQueryBuilder()
      .delete()
      .from(UserEntity)
      .where('email = :email', {
        email: 'support@infomatix.io',
      })
      .execute();
  }
}
