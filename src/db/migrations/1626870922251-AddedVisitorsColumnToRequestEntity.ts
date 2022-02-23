import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedVisitorsColumnToRequestEntity1626870922251
  implements MigrationInterface
{
  name = 'AddedVisitorsColumnToRequestEntity1626870922251';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "requests_visitors_users" ("requestsId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_76e30856ab4ead4360f5e8e25e0" PRIMARY KEY ("requestsId", "usersId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_903627496e25884a1ccd9fe88c" ON "requests_visitors_users" ("requestsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_de0752a6c9da90b007816a7fb3" ON "requests_visitors_users" ("usersId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "requests_visitors_users" ADD CONSTRAINT "FK_903627496e25884a1ccd9fe88cf" FOREIGN KEY ("requestsId") REFERENCES "requests"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests_visitors_users" ADD CONSTRAINT "FK_de0752a6c9da90b007816a7fb3b" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "requests_visitors_users" DROP CONSTRAINT "FK_de0752a6c9da90b007816a7fb3b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests_visitors_users" DROP CONSTRAINT "FK_903627496e25884a1ccd9fe88cf"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_de0752a6c9da90b007816a7fb3"`);
    await queryRunner.query(`DROP INDEX "IDX_903627496e25884a1ccd9fe88c"`);
    await queryRunner.query(`DROP TABLE "requests_visitors_users"`);
  }
}
