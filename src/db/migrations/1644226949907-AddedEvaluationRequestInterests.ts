import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedEvaluationRequestInterests1644226949907
  implements MigrationInterface
{
  name = 'AddedEvaluationRequestInterests1644226949907';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "evaluation_request_interests" ("id" SERIAL NOT NULL, "assetName" text NOT NULL, "assetDescription" text NOT NULL, "estimatedPrice" integer NOT NULL DEFAULT '0', "email" character varying NOT NULL, "firstName" character varying NOT NULL, "referralCode" character varying NOT NULL, "referralUsagesCounter" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4b9be3c09488e353a731a8bd5d1" UNIQUE ("referralCode"), CONSTRAINT "PK_a9a9233fb3adeb21b8cd8cf72c7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "evaluation_request_interests_asset_pictures_storage_items" ("evaluationRequestInterestsId" integer NOT NULL, "storageItemsId" integer NOT NULL, CONSTRAINT "PK_2571c8d9b0fd2cf94f1ce1d39dd" PRIMARY KEY ("evaluationRequestInterestsId", "storageItemsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f8c81dd18982cad24e342c1964" ON "evaluation_request_interests_asset_pictures_storage_items" ("evaluationRequestInterestsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b3a3cd9dfe6fa94c48230346c0" ON "evaluation_request_interests_asset_pictures_storage_items" ("storageItemsId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "evaluation_request_interests_categories_specific_categories" ("evaluationRequestInterestsId" integer NOT NULL, "specificCategoriesId" integer NOT NULL, CONSTRAINT "PK_8800a88073524665faf03394438" PRIMARY KEY ("evaluationRequestInterestsId", "specificCategoriesId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e7cf04f9207bb6022fa02d5ee0" ON "evaluation_request_interests_categories_specific_categories" ("evaluationRequestInterestsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_91a3af43f0129788ef5b86ca4d" ON "evaluation_request_interests_categories_specific_categories" ("specificCategoriesId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "responses" ALTER COLUMN "price" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "evaluation_request_interests_asset_pictures_storage_items" ADD CONSTRAINT "FK_f8c81dd18982cad24e342c19642" FOREIGN KEY ("evaluationRequestInterestsId") REFERENCES "evaluation_request_interests"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "evaluation_request_interests_asset_pictures_storage_items" ADD CONSTRAINT "FK_b3a3cd9dfe6fa94c48230346c02" FOREIGN KEY ("storageItemsId") REFERENCES "storage_items"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "evaluation_request_interests_categories_specific_categories" ADD CONSTRAINT "FK_e7cf04f9207bb6022fa02d5ee04" FOREIGN KEY ("evaluationRequestInterestsId") REFERENCES "evaluation_request_interests"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "evaluation_request_interests_categories_specific_categories" ADD CONSTRAINT "FK_91a3af43f0129788ef5b86ca4d8" FOREIGN KEY ("specificCategoriesId") REFERENCES "specific_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "evaluation_request_interests_categories_specific_categories" DROP CONSTRAINT "FK_91a3af43f0129788ef5b86ca4d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "evaluation_request_interests_categories_specific_categories" DROP CONSTRAINT "FK_e7cf04f9207bb6022fa02d5ee04"`,
    );
    await queryRunner.query(
      `ALTER TABLE "evaluation_request_interests_asset_pictures_storage_items" DROP CONSTRAINT "FK_b3a3cd9dfe6fa94c48230346c02"`,
    );
    await queryRunner.query(
      `ALTER TABLE "evaluation_request_interests_asset_pictures_storage_items" DROP CONSTRAINT "FK_f8c81dd18982cad24e342c19642"`,
    );
    await queryRunner.query(
      `ALTER TABLE "responses" ALTER COLUMN "price" TYPE numeric`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_91a3af43f0129788ef5b86ca4d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e7cf04f9207bb6022fa02d5ee0"`,
    );
    await queryRunner.query(
      `DROP TABLE "evaluation_request_interests_categories_specific_categories"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b3a3cd9dfe6fa94c48230346c0"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_f8c81dd18982cad24e342c1964"`,
    );
    await queryRunner.query(
      `DROP TABLE "evaluation_request_interests_asset_pictures_storage_items"`,
    );
    await queryRunner.query(`DROP TABLE "evaluation_request_interests"`);
  }
}
