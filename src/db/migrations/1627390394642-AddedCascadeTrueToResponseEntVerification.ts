import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedCascadeTrueToResponseEntVerification1627390394642
  implements MigrationInterface
{
  name = 'AddedCascadeTrueToResponseEntVerification1627390394642';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "response_attachments_documents" ("id" SERIAL NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "storageItemId" integer, "responseId" integer, CONSTRAINT "REL_9276039de7342476b51eb54e09" UNIQUE ("storageItemId"), CONSTRAINT "PK_f67d74c1225088db461c116c351" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "response_attachments_documents" ADD CONSTRAINT "FK_9276039de7342476b51eb54e095" FOREIGN KEY ("storageItemId") REFERENCES "storage_items"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "response_attachments_documents" ADD CONSTRAINT "FK_17c9f84ef5e25c92db8ddec4435" FOREIGN KEY ("responseId") REFERENCES "responses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "response_attachments_documents" DROP CONSTRAINT "FK_17c9f84ef5e25c92db8ddec4435"`,
    );
    await queryRunner.query(
      `ALTER TABLE "response_attachments_documents" DROP CONSTRAINT "FK_9276039de7342476b51eb54e095"`,
    );
    await queryRunner.query(`DROP TABLE "response_attachments_documents"`);
  }
}
