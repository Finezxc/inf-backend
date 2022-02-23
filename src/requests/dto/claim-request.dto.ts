import { ApiProperty } from '@nestjs/swagger';

import { IdType } from 'common/types/id-type.type';
import { IsId } from 'common/decorators/is-id.decorator';

export class ClaimRequestDto {
  @ApiProperty()
  @IsId()
  id: IdType;
}
