import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { CredentialDocumentTypeEntity } from 'db/entities/credential-document-type.entity';
import { StorageItemEntity } from 'db/entities/storage-item.entity';
import { BaseEntity } from 'db/entities/base-entity.entity';
import { UserEntity } from 'db/entities/user.entity';

@Entity({ name: 'verifier_credential_documents' })
export class VerifierCredentialDocument extends BaseEntity {
  @ManyToOne(() => CredentialDocumentTypeEntity)
  documentType: CredentialDocumentTypeEntity;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @OneToOne(() => StorageItemEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  storageItem: StorageItemEntity;

  @ManyToOne(() => UserEntity, (user) => user.verifierCredentialDocuments)
  user;

  @Column()
  documentTypeId: number;

  @Column()
  storageItemId: number;
}
