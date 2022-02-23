import { Entity, ManyToMany } from 'typeorm';

import { UserRoleEnum } from 'common/enums/user-role.enum';
import { BaseEnumEntity } from 'db/entities/base-enum.entity';
import { UserEntity } from 'db/entities/user.entity';

@Entity({ name: 'user_roles' })
export class UserRoleEntity extends BaseEnumEntity<UserRoleEnum> {
  @ManyToMany(() => UserEntity, (user) => user.roles, { lazy: true })
  users: UserEntity[];
}
