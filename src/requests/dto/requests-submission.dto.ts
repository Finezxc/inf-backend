import { ApiProperty } from '@nestjs/swagger';

import { IdType } from 'common/types/id-type.type';
import { IsId } from 'common/decorators/is-id.decorator';
import { IsStringWithDefinedLength } from 'common/decorators/is-string.decorator';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateCurrency } from 'requests/dto/create-currency.dto';

export class RequestsSubmissionDto {
  @ApiProperty()
  @IsStringWithDefinedLength()
  title: string;

  @ApiProperty()
  @IsStringWithDefinedLength(5, 10000)
  description: string;

  @ApiProperty({ type: [Number] })
  @IsId({ each: true, nullable: false })
  expertiseKeywordIds: IdType[];

  @ApiProperty()
  @IsArray()
  categories: [];

  @ApiProperty({ type: [CreateCurrency], nullable: false })
  @ValidateNested({ each: true })
  @Type(() => CreateCurrency)
  currencies: CreateCurrency[];

  @ApiProperty()
  @IsArray()
  inflationAdjustmentYears: number[];
}
