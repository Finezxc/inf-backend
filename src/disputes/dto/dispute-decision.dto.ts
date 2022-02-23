import { ApiProperty } from '@nestjs/swagger';
import { IdType } from '../../common/types/id-type.type';
import { DisputeStatusEnum } from '../../common/enums/dispute-status.enum';
import { IsEnum } from 'class-validator';

export class DisputeDecisionDto {
  @ApiProperty()
  id: IdType;

  @ApiProperty()
  @IsEnum(DisputeStatusEnum)
  status: DisputeStatusEnum;
}
