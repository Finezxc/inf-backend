import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

import { IsId } from 'common/decorators/is-id.decorator';
import { IsStringWithDefinedLength } from 'common/decorators/is-string.decorator';

export class CreateCurrency {
  @IsId()
  @ApiProperty()
  id: number;

  @IsStringWithDefinedLength()
  @ApiProperty()
  name: string;

  @IsStringWithDefinedLength()
  @ApiProperty()
  symbolNative: string;

  @IsStringWithDefinedLength()
  @ApiProperty()
  symbol: string;

  @IsStringWithDefinedLength()
  @ApiProperty()
  namePlural: string;

  @IsStringWithDefinedLength()
  @ApiProperty()
  code: string;

  @IsNumber()
  @ApiProperty()
  decimalDigits: number;

  @IsNumber()
  @ApiProperty()
  rounding: number;
}
