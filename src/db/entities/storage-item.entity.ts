import { Entity, Column, CreateDateColumn } from 'typeorm';

import { BaseEntity } from 'db/entities/base-entity.entity';

@Entity({ name: 'storage_items' })
export class StorageItemEntity extends BaseEntity {
  @Column('text')
  storedFileName: string;

  @Column('text')
  originalFileName: string;

  @Column('text')
  storagePath: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
