import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeResponseOwnershipTypeEntity1634112556876
  implements MigrationInterface
{
  name = 'ChangeResponseOwnershipTypeEntity1634112556876';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "response_attachments_documents" DROP CONSTRAINT "FK_9276039de7342476b51eb54e095"`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses" DROP CONSTRAINT "FK_cbed3fa31fe03675b5e6284dbe6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses" RENAME COLUMN "ownershipId" TO "storageItemId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "response_attachments_documents" DROP CONSTRAINT "REL_9276039de7342476b51eb54e09"`,
    );
    await queryRunner.query(
      `ALTER TABLE "response_attachments_documents" DROP COLUMN "storageItemId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "response_attachments_documents" DROP COLUMN "title"`,
    );
    await queryRunner.query(
      `ALTER TABLE "response_attachments_documents" DROP COLUMN "description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "response_attachments_documents" ADD "ownershipId" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "response_attachments_documents" ADD "citationId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "response_attachments_documents" ADD CONSTRAINT "UQ_5ddec0ad6b4294eb61e9c5c0a24" UNIQUE ("citationId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses" DROP COLUMN "storageItemId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses" ADD "storageItemId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses" ADD CONSTRAINT "UQ_c80ad4fbff8d43a41b7f6b01a2d" UNIQUE ("storageItemId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "response_attachments_documents" ADD CONSTRAINT "FK_bf0d97d0d63667d0b4ec3fe6b40" FOREIGN KEY ("ownershipId") REFERENCES "response_ownership_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "response_attachments_documents" ADD CONSTRAINT "FK_5ddec0ad6b4294eb61e9c5c0a24" FOREIGN KEY ("citationId") REFERENCES "citations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses" ADD CONSTRAINT "FK_c80ad4fbff8d43a41b7f6b01a2d" FOREIGN KEY ("storageItemId") REFERENCES "storage_items"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );

    await queryRunner.query(
      `ALTER TABLE "responses_citations_citations" DROP CONSTRAINT "FK_f319b565aa2346bc6550a969a46"`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses_citations_citations" DROP CONSTRAINT "FK_b483d6fe61474aede51b82c692d"`,
    );

    await queryRunner.query(`DROP TABLE "responses_citations_citations"`);

    await queryRunner.query(
      `ALTER TABLE "responses_attachments_storage_items" DROP CONSTRAINT "FK_1a69fe6b4d5a9b501dd3aedc98c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses_attachments_storage_items" DROP CONSTRAINT "FK_9092e354189c176b2a2acae62f9"`,
    );

    await queryRunner.query(`DROP TABLE "responses_attachments_storage_items"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "responses" DROP CONSTRAINT "FK_c80ad4fbff8d43a41b7f6b01a2d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "response_attachments_documents" DROP CONSTRAINT "FK_5ddec0ad6b4294eb61e9c5c0a24"`,
    );
    await queryRunner.query(
      `ALTER TABLE "response_attachments_documents" DROP CONSTRAINT "FK_bf0d97d0d63667d0b4ec3fe6b40"`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses" DROP CONSTRAINT "UQ_c80ad4fbff8d43a41b7f6b01a2d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses" DROP COLUMN "storageItemId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses" ADD "storageItemId" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "response_attachments_documents" DROP CONSTRAINT "UQ_5ddec0ad6b4294eb61e9c5c0a24"`,
    );
    await queryRunner.query(
      `ALTER TABLE "response_attachments_documents" DROP COLUMN "citationId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "response_attachments_documents" DROP COLUMN "ownershipId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "response_attachments_documents" ADD "description" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "response_attachments_documents" ADD "title" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "response_attachments_documents" ADD "storageItemId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "response_attachments_documents" ADD CONSTRAINT "REL_9276039de7342476b51eb54e09" UNIQUE ("storageItemId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses" RENAME COLUMN "storageItemId" TO "ownershipId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses" ADD CONSTRAINT "FK_cbed3fa31fe03675b5e6284dbe6" FOREIGN KEY ("ownershipId") REFERENCES "response_ownership_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "response_attachments_documents" ADD CONSTRAINT "FK_9276039de7342476b51eb54e095" FOREIGN KEY ("storageItemId") REFERENCES "storage_items"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `CREATE TABLE "responses_citations_citations" ("responsesId" integer NOT NULL, "citationsId" integer NOT NULL, CONSTRAINT "PK_bc24f496cd1c613d74fb2d8173f" PRIMARY KEY ("responsesId", "citationsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b483d6fe61474aede51b82c692" ON "responses_citations_citations" ("responsesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f319b565aa2346bc6550a969a4" ON "responses_citations_citations" ("citationsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "responses_citations_citations" ADD CONSTRAINT "FK_b483d6fe61474aede51b82c692d" FOREIGN KEY ("responsesId") REFERENCES "responses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses_citations_citations" ADD CONSTRAINT "FK_f319b565aa2346bc6550a969a46" FOREIGN KEY ("citationsId") REFERENCES "citations"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );

    await queryRunner.query(
      `CREATE TABLE "responses_attachments_storage_items" ("responsesId" integer NOT NULL, "storageItemsId" integer NOT NULL, CONSTRAINT "PK_0fbf98a0139291ba9229975c2c4" PRIMARY KEY ("responsesId", "storageItemsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9092e354189c176b2a2acae62f" ON "responses_attachments_storage_items" ("responsesId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1a69fe6b4d5a9b501dd3aedc98" ON "responses_attachments_storage_items" ("storageItemsId") `,
    );

    await queryRunner.query(
      `ALTER TABLE "responses_attachments_storage_items" ADD CONSTRAINT "FK_9092e354189c176b2a2acae62f9" FOREIGN KEY ("responsesId") REFERENCES "responses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses_attachments_storage_items" ADD CONSTRAINT "FK_1a69fe6b4d5a9b501dd3aedc98c" FOREIGN KEY ("storageItemsId") REFERENCES "storage_items"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }
}
