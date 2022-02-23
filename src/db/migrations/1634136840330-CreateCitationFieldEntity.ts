import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCitationFieldEntity1634136840330
  implements MigrationInterface
{
  name = 'CreateCitationFieldEntity1634136840330';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "citation_fields" ("id" SERIAL NOT NULL, "name" text NOT NULL, "citationTypeId" bigint, CONSTRAINT "PK_8e0b4ee17908041629cf1b5c2e4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "citation_fields" ADD CONSTRAINT "FK_541241e4f347051df724b41efce" FOREIGN KEY ("citationTypeId") REFERENCES "citation_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "citation_fields" DROP CONSTRAINT "FK_541241e4f347051df724b41efce"`,
    );
    await queryRunner.query(`DROP TABLE "citation_fields"`);
  }
}
