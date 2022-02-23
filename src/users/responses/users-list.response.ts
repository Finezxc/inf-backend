import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from 'db/entities/user.entity';

export class UsersListResponse {
  @ApiProperty()
  selectedInfo: UserEntity[];

  @ApiProperty()
  count: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  static fromUser(user: UserEntity) {
    const { firstName, lastName, roles, profilePicture, id } = user;
    return {
      firstName,
      lastName,
      roles,
      profilePicture,
      id,
    };
  }
}
