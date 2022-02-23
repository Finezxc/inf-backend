import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovedUniqueFromSpecificCategory1644248308629
  implements MigrationInterface
{
  name = 'RemovedUniqueFromSpecificCategory1644248308629';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "specific_categories" DROP CONSTRAINT "UQ_a84cb9cb9db43fed7474c307adb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses" ALTER COLUMN "price" TYPE numeric`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "responses" ALTER COLUMN "price" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "specific_categories" ADD CONSTRAINT "UQ_a84cb9cb9db43fed7474c307adb" UNIQUE ("userDefinedCategory", "categoryId")`,
    );
  }
}
