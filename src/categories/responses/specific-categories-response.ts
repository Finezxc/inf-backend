import { ApiProperty } from '@nestjs/swagger';

import type { IdType } from 'common/types/id-type.type';

export class SpecificCategoriesResponse {
  @ApiProperty()
  id: IdType;
  @ApiProperty()
  userDefinedCategory?: string;
}
