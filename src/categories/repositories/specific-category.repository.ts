import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { EntityRepository } from 'typeorm';

import { SpecificCategoryEntity } from 'db/entities/specific-category.entity';

@Injectable()
@EntityRepository(SpecificCategoryEntity)
export class SpecificCategoryRepository extends BaseRepository<SpecificCategoryEntity> {}
