import { Column, Entity } from 'typeorm';

import { BaseEntity } from 'db/entities/base-entity.entity';

@Entity({ name: 'expertise_keywords' })
export class ExpertiseKeywordEntity extends BaseEntity {
  @Column({ type: 'text', unique: true })
  name: string;
}
