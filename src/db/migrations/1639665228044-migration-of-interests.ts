import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationOfInterests1639665228044 implements MigrationInterface {
    name = 'migrationOfInterests1639665228044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "interests" ("id" SERIAL NOT NULL, "fullName" text NOT NULL, "location" text, "email" character varying NOT NULL, CONSTRAINT "UQ_ab2d1077805f4cb81600f3cf8b5" UNIQUE ("email"), CONSTRAINT "PK_a2dc7b6f9a8bcf9e3f9312a879d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "interests_expertise_categories_categories" ("interestsId" integer NOT NULL, "categoriesId" integer NOT NULL, CONSTRAINT "PK_1bcb481e4d8ecd98bbd25327318" PRIMARY KEY ("interestsId", "categoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_52f331dbcbcdcdc1184234fe13" ON "interests_expertise_categories_categories" ("interestsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5112f9bd6b1a489b8c5eb41c92" ON "interests_expertise_categories_categories" ("categoriesId") `);
        await queryRunner.query(`ALTER TABLE "responses" ALTER COLUMN "price" TYPE numeric`);
        await queryRunner.query(`ALTER TABLE "interests_expertise_categories_categories" ADD CONSTRAINT "FK_52f331dbcbcdcdc1184234fe134" FOREIGN KEY ("interestsId") REFERENCES "interests"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "interests_expertise_categories_categories" ADD CONSTRAINT "FK_5112f9bd6b1a489b8c5eb41c923" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "interests_expertise_categories_categories" DROP CONSTRAINT "FK_5112f9bd6b1a489b8c5eb41c923"`);
        await queryRunner.query(`ALTER TABLE "interests_expertise_categories_categories" DROP CONSTRAINT "FK_52f331dbcbcdcdc1184234fe134"`);
        await queryRunner.query(`ALTER TABLE "responses" ALTER COLUMN "price" TYPE numeric`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5112f9bd6b1a489b8c5eb41c92"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_52f331dbcbcdcdc1184234fe13"`);
        await queryRunner.query(`DROP TABLE "interests_expertise_categories_categories"`);
        await queryRunner.query(`DROP TABLE "interests"`);
    }

}
