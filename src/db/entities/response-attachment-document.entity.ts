import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { BaseEntity } from 'db/entities/base-entity.entity';
import { ResponseEntity } from 'db/entities/response.entity';
import { ResponseOwnershipTypeEntity } from './response-ownership-type.entity';
import { Citation } from './citation.entity';

@Entity({ name: 'response_attachments_documents' })
export class ResponseAttachmentDocumentEntity extends BaseEntity {
  @ManyToOne(
    () => ResponseEntity,
    (response) => response.responseAttachmentDocuments,
  )
  response: ResponseEntity;

  @ManyToOne(() => ResponseOwnershipTypeEntity)
  ownership: ResponseOwnershipTypeEntity;

  @OneToOne(() => Citation, { cascade: true })
  @JoinColumn()
  citation: Citation;
}
