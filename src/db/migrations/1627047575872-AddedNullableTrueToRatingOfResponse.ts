import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedNullableTrueToRatingOfResponse1627047575872
  implements MigrationInterface
{
  name = 'AddedNullableTrueToRatingOfResponse1627047575872';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "responses" ALTER COLUMN "rating" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "responses" ALTER COLUMN "rating" SET NOT NULL`,
    );
  }
}
