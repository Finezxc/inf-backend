import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from 'db/entities/base-entity.entity';
import { CategoryEntity } from 'db/entities/category.entity';

@Entity({ name: 'interests' })
export class InterestEntity extends BaseEntity {
  @Column('text')
  fullName: string;

  @Column('text', { nullable: true })
  location: string;

  @ManyToMany(() => CategoryEntity)
  @JoinTable()
  expertiseCategories: CategoryEntity[];

  @Column({ unique: true })
  email: string;
}
