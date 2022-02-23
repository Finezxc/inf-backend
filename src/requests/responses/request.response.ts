import { ApiProperty } from '@nestjs/swagger';
import { IdType } from '../../common/types/id-type.type';
import { Exclude } from 'class-transformer';
import { UserEntity } from '../../db/entities/user.entity';
import { ResponseEntity } from '../../db/entities/response.entity';
import { CategoryEntity } from '../../db/entities/category.entity';

export class RequestResponse {
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
  inflationAdjustmentYears: [number];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  timeLimit: number;

  @ApiProperty()
  requestViews: number;

  @ApiProperty()
  expertiseKeywords: [];

  @ApiProperty({ type: CategoryEntity })
  categories: CategoryEntity[];

  @ApiProperty()
  numberOfResponses: number;

  @Exclude()
  visitors: UserEntity;

  @Exclude()
  responses: ResponseEntity[];
}
