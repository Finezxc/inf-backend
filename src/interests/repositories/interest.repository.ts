import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { InterestEntity } from 'db/entities/interest.entity';

@Injectable()
@EntityRepository(InterestEntity)
export class InterestRepository extends BaseRepository<InterestEntity> {}
