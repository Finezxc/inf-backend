import { ApiProperty } from '@nestjs/swagger';

import { IdType } from 'common/types/id-type.type';

export class BanUserDto {
  @ApiProperty()
  userId: IdType;
}
