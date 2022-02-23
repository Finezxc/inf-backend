import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { EntityRepository } from 'typeorm';

import { RequestEntity } from 'db/entities/request.entity';

@Injectable()
@EntityRepository(RequestEntity)
export class RequestRepository extends BaseRepository<RequestEntity> {}
