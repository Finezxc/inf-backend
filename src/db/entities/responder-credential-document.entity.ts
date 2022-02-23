import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { CredentialDocumentTypeEntity } from 'db/entities/credential-document-type.entity';
import { StorageItemEntity } from 'db/entities/storage-item.entity';
import { BaseEntity } from 'db/entities/base-entity.entity';
import { UserEntity } from 'db/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'responder_credential_documents' })
export class ResponderCredentialDocument extends BaseEntity {
  @ManyToOne(() => CredentialDocumentTypeEntity)
  @ApiProperty()
  documentType: CredentialDocumentTypeEntity;

  @Column('text')
  @ApiProperty()
  title: string;

  @Column('text')
  @ApiProperty()
  description: string;

  @OneToOne(() => StorageItemEntity)
  @JoinColumn({ name: 'storageItemId', referencedColumnName: 'id' })
  storageItem: StorageItemEntity;

  @ManyToOne(() => UserEntity, (user) => user.responderCredentialDocuments)
  @ApiProperty()
  user: UserEntity;

  @Column()
  documentTypeId: number;

  @Column()
  storageItemId: number;
}
