import { ApiProperty } from '@nestjs/swagger';
import { CurrencyEnum } from 'common/enums/currency.enum';

export class CurrencyResponse {
  @ApiProperty()
  id: CurrencyEnum;

  @ApiProperty()
  name: string;

  @ApiProperty()
  symbolNative: string;

  @ApiProperty()
  symbol: string;

  @ApiProperty()
  namePlural: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  decimalDigits: number;

  @ApiProperty()
  rounding: number;
}
