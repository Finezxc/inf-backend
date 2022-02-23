import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { EntityRepository, In } from 'typeorm';

import { CategoryEntity } from 'db/entities/category.entity';
import { IdType } from 'common/types/id-type.type';

@Injectable()
@EntityRepository(CategoryEntity)
export class CategoryRepository extends BaseRepository<CategoryEntity> {
  public async getCategoriesByIds(
    ids: IdType[],
  ): Promise<Array<CategoryEntity>> {
    return this.find({ where: { id: In(ids) } });
  }
}
