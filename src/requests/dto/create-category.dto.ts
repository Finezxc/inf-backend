import { ApiProperty } from '@nestjs/swagger';

import { IsId } from 'common/decorators/is-id.decorator';
import { IsStringWithDefinedLength } from 'common/decorators/is-string.decorator';
import { IdType } from 'common/types/id-type.type';

export class CreateSpecificCategory {
  @IsId()
  @ApiProperty()
  categoryId: IdType;

  @ApiProperty()
  @IsStringWithDefinedLength()
  userDefinedCategory: string;
}
