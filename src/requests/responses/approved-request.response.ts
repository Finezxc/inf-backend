import { ApiProperty } from '@nestjs/swagger';
import { IdType } from 'common/types/id-type.type';

export class ApprovedRequestResponse {
  @ApiProperty()
  id: IdType;

  @ApiProperty()
  requesterId: IdType;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  reward: number;

  @ApiProperty()
  timeLimit?: number;

  @ApiProperty()
  inflationAdjustmentYears: number[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  response?: IdType;
}
