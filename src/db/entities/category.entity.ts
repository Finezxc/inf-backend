import { Entity, Column } from 'typeorm';

import { BaseEntity } from './base-entity.entity';

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntity {
  @Column({ unique: true, type: 'text' })
  name: string;
}
