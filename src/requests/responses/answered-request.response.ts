import { ApiProperty } from '@nestjs/swagger';
import { EnumItemResponse } from 'common/responses/enum-item.response';
import { IdType } from 'common/types/id-type.type';
import { RequestEntity } from 'db/entities/request.entity';
import { SpecificCategoryEntity } from 'db/entities/specific-category.entity';

export class RequestResponse {
  @ApiProperty()
  id: IdType;

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

  @ApiProperty({ type: [SpecificCategoryEntity], nullable: false })
  categories: SpecificCategoryEntity[];

  @ApiProperty({ type: [EnumItemResponse], nullable: false })
  status: EnumItemResponse;

  @ApiProperty()
  requestViews: number;

  /*@ApiProperty({ type: [EnumItemResponse], nullable: false })
  numberOfResponses: EnumItemResponse;*/

  static fromRequest(request: RequestEntity, numberOfResponses: number) {
    const {
      id,
      title,
      requesterId,
      requestViews,
      description,
      categories,
      reward,
      createdAt,
      updatedAt,
      status,
      inflationAdjustmentYears,
      timeLimit,
    } = request;
    return {
      id,
      title,
      requesterId,
      requestViews,
      description,
      categories,
      reward,
      numberOfResponses,
      createdAt,
      updatedAt,
      status,
      inflationAdjustmentYears,
      timeLimit,
    };
  }
}
