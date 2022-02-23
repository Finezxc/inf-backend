import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  UpdateDateColumn,
} from 'typeorm';

import { BaseEntity } from 'db/entities/base-entity.entity';
import { StorageItemEntity } from 'db/entities/storage-item.entity';
import { SpecificCategoryEntity } from 'db/entities/specific-category.entity';

@Entity({ name: 'evaluation_request_interests' })
export class EvaluationRequestInterestEntity extends BaseEntity {
  @Column('text', { nullable: false })
  assetName: string;

  @Column('text', { nullable: false })
  assetDescription: string;

  @ManyToMany(() => StorageItemEntity)
  @JoinTable()
  assetPictures?: StorageItemEntity[];

  @ManyToMany(() => SpecificCategoryEntity, { cascade: true })
  @JoinTable()
  categories: SpecificCategoryEntity[];

  @Column({ nullable: false, default: 0 })
  estimatedPrice: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false, unique: true })
  referralCode: string;

  @Column({ nullable: false, default: 0 })
  referralUsagesCounter: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
