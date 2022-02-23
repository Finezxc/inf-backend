import { Injectable } from '@nestjs/common';
import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';

import { UserRoleEntity } from 'db/entities/user-role.entity';

@Injectable()
@EntityRepository(UserRoleEntity)
export class UserRoleRepository extends BaseRepository<UserRoleEntity> {}
