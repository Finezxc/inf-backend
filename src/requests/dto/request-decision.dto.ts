import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { IdType } from 'common/types/id-type.type';
import { IsId } from 'common/decorators/is-id.decorator';
import { DecisionType } from '../../admin/mixins/decision.mixin';

export class RequestDecisionDto {
  @ApiProperty()
  @IsId()
  id: IdType;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  @DecisionType()
  decision: boolean;

  @IsNumber()
  @IsOptional()
  reward: number;

  @IsNumber()
  @IsOptional()
  timeLimit: number;
}
