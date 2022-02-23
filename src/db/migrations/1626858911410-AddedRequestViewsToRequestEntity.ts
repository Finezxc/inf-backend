import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedRequestViewsToRequestEntity1626858911410
  implements MigrationInterface
{
  name = 'AddedRequestViewsToRequestEntity1626858911410';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "requests" ADD "requestViews" integer`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "requests" DROP COLUMN "requestViews"`,
    );
  }
}
