import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { StorageItemEntity } from './storage-item.entity';
import { BaseEntity } from './base-entity.entity';

@Entity({ name: 'response_templates' })
export class ResponseTemplateEntity extends BaseEntity {
  @Column('text', { nullable: true })
  name?: string;

  @OneToOne(() => StorageItemEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  storageItem: StorageItemEntity;
}
