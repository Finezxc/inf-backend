import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

import { IdType } from 'common/types/id-type.type';
import { IsId } from 'common/decorators/is-id.decorator';

export class VerifierStatusDecisionDto {
  @ApiProperty()
  @IsId()
  id: IdType;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  decision: boolean;
}
