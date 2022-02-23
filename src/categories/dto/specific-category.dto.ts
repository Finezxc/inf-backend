import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { ValidateIf } from 'class-validator';
import { IsId } from 'common/decorators/is-id.decorator';
import { IsStringWithDefinedLength } from 'common/decorators/is-string.decorator';
import { IdType } from 'common/types/id-type.type';

export class SpecificCategoryDto {
  @IsId()
  @ApiProperty()
  id: IdType;

  @ApiPropertyOptional()
  @ValidateIf((o) => o.id === 12)
  @IsStringWithDefinedLength()
  userDefinedCategory: string;
}
