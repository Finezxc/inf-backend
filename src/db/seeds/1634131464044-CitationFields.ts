import { MigrationInterface, QueryRunner } from 'typeorm';
import { applySeedEnum } from '../utils/applySeedEnum';
import { CitationFieldEntity } from '../entities/citation-field.entity';
import { citationFields } from './data/1624718488485-Enums/citationFields';
import { revertSeedEnum } from '../utils/revertSeedEnum';

export class CitationFields1634131464044 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const builder = await queryRunner.manager.createQueryBuilder();

    await applySeedEnum(CitationFieldEntity, builder, citationFields);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const builder = await queryRunner.manager.createQueryBuilder();

    await revertSeedEnum(CitationFieldEntity, builder, citationFields);
  }
}
