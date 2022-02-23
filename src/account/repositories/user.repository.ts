import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { UserEntity } from 'db/entities/user.entity';

@Injectable()
@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {}
