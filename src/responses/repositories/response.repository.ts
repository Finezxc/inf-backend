import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { EntityRepository } from 'typeorm';

import { ResponseEntity } from 'db/entities/response.entity';

@Injectable()
@EntityRepository(ResponseEntity)
export class ResponseRepository extends BaseRepository<ResponseEntity> {}
