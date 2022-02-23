import { ApiProperty } from '@nestjs/swagger';

import { IsStringWithDefinedLength } from 'common/decorators/is-string.decorator';

export class CategoryAdditionDto {
  @ApiProperty()
  @IsStringWithDefinedLength()
  userDefinedCategory: string;
}
