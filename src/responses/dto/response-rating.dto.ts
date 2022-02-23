import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import { IdType } from 'common/types/id-type.type';
import { IsValidRating } from 'common/decorators/is-valid-rating.decorator';

export class ResponseRatingDto {
  @ApiProperty()
  @Transform(({ value }) => {
    return Number(value);
  })
  responseId: IdType;

  @ApiProperty()
  @IsValidRating()
  rating: number;
}
