import { Entity, Column, ManyToOne } from 'typeorm';

import { CategoryEntity } from 'db/entities/category.entity';
import { BaseEntity } from 'db/entities/base-entity.entity';

@Entity({ name: 'specific_categories' })
export class SpecificCategoryEntity extends BaseEntity {
  @ManyToOne(() => CategoryEntity)
  category: CategoryEntity;

  @Column({ nullable: true, type: 'text' })
  userDefinedCategory?: string;
}
