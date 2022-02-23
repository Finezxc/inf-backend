import { ApiProperty } from '@nestjs/swagger';

import type { IdType } from 'common/types/id-type.type';

export class EnumItemResponse {
  @ApiProperty()
  id: IdType;
  @ApiProperty()
  name: string;
}
