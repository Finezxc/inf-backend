import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSettingsTable1634281330532 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "platform_settings" ("id" SERIAL NOT NULL, "customization" character varying NOT NULL, "value" double precision NOT NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "platform_settings"`);
  }
}
