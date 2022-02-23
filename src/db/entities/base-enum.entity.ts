import { Column, PrimaryColumn } from 'typeorm';

import { IdLiteralType } from 'common/types/id-type.type';
import { ColumnNumericTransformer } from 'db/utils/ColumnNumericTransformer';

export abstract class BaseEnumEntity<T> {
  @PrimaryColumn(IdLiteralType, { transformer: new ColumnNumericTransformer() })
  id: T;

  @Column({ unique: true, type: 'text' })
  name: string;
}
