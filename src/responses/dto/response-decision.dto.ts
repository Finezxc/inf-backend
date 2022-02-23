import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { IdType } from 'common/types/id-type.type';
import { IsId } from 'common/decorators/is-id.decorator';

export class ResponseDecisionDto {
  @ApiProperty()
  @IsId()
  responseId: IdType;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  decision: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  reward?: number;
}
