import { Column, Entity, PrimaryColumn } from 'typeorm';

import { CurrencyEnum } from 'common/enums/currency.enum';
import { IdLiteralType } from 'common/types/id-type.type';

@Entity({ name: 'currencies' })
export class CurrencyEntity {
  @PrimaryColumn(IdLiteralType)
  id: CurrencyEnum;

  @Column('text')
  name: string;

  @Column('text')
  symbolNative: string;

  @Column('text')
  symbol: string;

  @Column('text')
  namePlural: string;

  @Column('text')
  code: string;

  @Column('smallint')
  decimalDigits: number;

  @Column('float')
  rounding: number;
}
