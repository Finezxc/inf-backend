import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { BaseEntity } from 'db/entities/base-entity.entity';
import { RequestEntity } from 'db/entities/request.entity';
import { UserEntity } from 'db/entities/user.entity';
import { VerificationEntity } from 'db/entities/verification.entity';
import { ResponderPaymentStrategy } from 'db/entities/payment-strategy.entity';
import { ResponseAttachmentDocumentEntity } from 'db/entities/response-attachment-document.entity';
import { StorageItemEntity } from './storage-item.entity';
import { ResponseOwnershipTypeEntity } from './response-ownership-type.entity';
import { Exclude } from 'class-transformer';
import { Citation } from './citation.entity';
import { ColumnNumericTransformer } from '../utils/ColumnNumericTransformer';

@Entity({ name: 'responses' })
export class ResponseEntity extends BaseEntity {
  @ManyToOne(() => RequestEntity, (request) => request.responses, {
    onDelete: 'CASCADE',
  })
  request: RequestEntity;

  @ManyToOne(() => UserEntity, (user) => user.responses, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @OneToOne(() => VerificationEntity, { cascade: true })
  @JoinColumn()
  verification: VerificationEntity;

  @OneToMany(
    () => ResponseAttachmentDocumentEntity,
    (responseAttachmentDocument) => responseAttachmentDocument.response,
    { cascade: true },
  )
  responseAttachmentDocuments: ResponseAttachmentDocumentEntity[];

  @OneToOne(() => StorageItemEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  storageItem: StorageItemEntity;

  @Column('float', { nullable: true })
  assignedReward?: number;

  @ManyToOne(() => ResponderPaymentStrategy, { nullable: true })
  responderPaymentStrategy?: ResponderPaymentStrategy;

  @Column('float', { nullable: true })
  rating: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Exclude()
  updatedAt: Date;

  @Column()
  @Exclude()
  justificationId: number;

  @ManyToOne(() => ResponseOwnershipTypeEntity)
  justification: ResponseOwnershipTypeEntity;

  citations: Citation[];

  @Column('numeric', {
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @Column({ nullable: true })
  status: boolean;
}
