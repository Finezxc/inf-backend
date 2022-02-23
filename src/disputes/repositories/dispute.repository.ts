import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { DisputeEntity } from '../../db/entities/dispute.entity';

@Injectable()
@EntityRepository(DisputeEntity)
export class DisputeRepository extends BaseRepository<DisputeEntity> {}
