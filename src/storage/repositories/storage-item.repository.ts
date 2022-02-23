import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { StorageItemEntity } from 'db/entities/storage-item.entity';

@Injectable()
@EntityRepository(StorageItemEntity)
export class StorageItemRepository extends BaseRepository<StorageItemEntity> {}
