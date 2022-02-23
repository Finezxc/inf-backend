import { PrimaryGeneratedColumn } from 'typeorm';

import { IdType } from 'common/types/id-type.type';

export abstract class BaseEntity<T = IdType> {
  @PrimaryGeneratedColumn()
  id: T;
}
