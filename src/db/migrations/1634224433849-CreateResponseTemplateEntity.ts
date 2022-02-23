import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateResponseTemplateEntity1634224433849 implements MigrationInterface {
    name = 'CreateResponseTemplateEntity1634224433849'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "response_templates" ("id" SERIAL NOT NULL, "name" text, "storageItemId" integer, CONSTRAINT "REL_e7aae08ebb5542fed4c523ba38" UNIQUE ("storageItemId"), CONSTRAINT "PK_bf84e82d3462acca76ede25948d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "response_templates" ADD CONSTRAINT "FK_e7aae08ebb5542fed4c523ba38d" FOREIGN KEY ("storageItemId") REFERENCES "storage_items"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "response_templates" DROP CONSTRAINT "FK_e7aae08ebb5542fed4c523ba38d"`);
        await queryRunner.query(`DROP TABLE "response_templates"`);
    }

}
